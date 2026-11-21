const express = require('express');
const session = require('express-session');
const passport = require('passport');
const request = require('supertest');

// In-memory stand-in for the Mongoose User model (callback-style findOne).
jest.mock('../schemes/user', () => {
  const users = [];
  function User(fields) {
    Object.assign(this, {
      id: String(users.length + 1),
      interests: { subjects: [], legislators: { senators: [], congresspeople: [] } },
      bookmarks: [],
      ...fields,
    });
    this.save = async () => {
      users.push(this);
      return this;
    };
  }
  const matches = (query) => (user) =>
    Object.entries(query).every(([key, value]) => (key === '_id' ? user.id === value : user[key] === value));
  User.findOne = jest.fn((query, cb) => cb(null, users.find(matches(query)) || null));
  User.updateOne = jest.fn(async () => ({ acknowledged: true, modifiedCount: 1 }));
  User.__users = users;
  return User;
});

const User = require('../schemes/user');

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(session({ secret: 'test', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());
  require('../passport-config')(passport);
  app.use('/auth', require('../routes/auth'));
  app.use('/userData', require('../routes/userData'));
  return app;
};

const credentials = { username: 'ada@example.com', password: 'secret123' };

describe('auth routes', () => {
  const app = buildApp();

  beforeEach(() => {
    User.__users.length = 0;
    User.updateOne.mockClear();
  });

  it('returns a friendly validation message', async () => {
    const res = await request(app).post('/auth/register').send({ username: 'ada@example.com', password: '1' });
    expect(res.body.msg).toBe('"Password"  must be at least 6 characters long.');
  });

  it('registers a user with a hashed password', async () => {
    const res = await request(app).post('/auth/register').send(credentials);
    expect(res.body.msg).toBe('New User Created!');
    expect(User.__users).toHaveLength(1);
    expect(User.__users[0].password).not.toBe(credentials.password);
  });

  it('refuses to register the same email twice', async () => {
    await request(app).post('/auth/register').send(credentials);
    const res = await request(app).post('/auth/register').send(credentials);
    expect(res.body.msg).toBe('User Already Exists.');
  });

  it('rejects a wrong password', async () => {
    await request(app).post('/auth/register').send(credentials);
    const res = await request(app).post('/auth/login').send({ ...credentials, password: 'wrong-pass' });
    expect(res.body.msg).toBe('Login Error. Check Username and Password.');
  });

  it('logs in, keeps the session, and logs out', async () => {
    const agent = request.agent(app);
    await agent.post('/auth/register').send(credentials);

    const login = await agent.post('/auth/login').send(credentials);
    expect(login.body).toMatchObject({ msg: 'Login Successful!', username: credentials.username });

    const me = await agent.get('/auth/user');
    expect(me.body).toEqual({ username: credentials.username });

    const data = await agent.get('/userData/data');
    expect(data.body).toMatchObject({ msg: 'Logged In', username: credentials.username });

    await agent.get('/auth/logout').expect(200);
    const after = await agent.get('/userData/data');
    expect(after.text).toBe('Not Authenticated....');
  });
});

describe('userData routes', () => {
  const app = buildApp();
  let agent;

  beforeEach(async () => {
    User.__users.length = 0;
    agent = request.agent(app);
    await agent.post('/auth/register').send(credentials);
    await agent.post('/auth/login').send(credentials);
    User.updateOne.mockClear();
  });

  it('requires a logged-in user', async () => {
    const res = await request(app).patch('/userData/trackSubject').send({ subject: 'Health' });
    expect(res.text).toBe('Not Authenticated....');
    expect(User.updateOne).not.toHaveBeenCalled();
  });

  it('tracks representatives and senators in separate lists', async () => {
    await agent.patch('/userData/trackLegislator').send({ id: 'R1', short_title: 'Rep.' }).expect(200);
    await agent.patch('/userData/trackLegislator').send({ id: 'S1', short_title: 'Sen.' }).expect(200);
    expect(User.updateOne.mock.calls.map(([, update]) => Object.keys(update.$addToSet)[0])).toEqual([
      'interests.legislators.congresspeople',
      'interests.legislators.senators',
    ]);
  });

  it('rejects legislators without a known title', async () => {
    await agent.patch('/userData/trackLegislator').send({ id: 'X', short_title: 'Gov.' }).expect(400);
    expect(User.updateOne).not.toHaveBeenCalled();
  });

  it('tracks and untracks subjects and bookmarks', async () => {
    await agent.patch('/userData/trackSubject').send({ subject: 'Health' }).expect(200);
    await agent.delete('/userData/untrackSubject').send({ subject: 'Health' }).expect(200);
    await agent.patch('/userData/bookmarkBill').send({ bill: { bill_id: 'hr1-117' } }).expect(200);
    await agent.delete('/userData/unbookmarkBill').send({ bill: { bill_id: 'hr1-117' } }).expect(200);

    const filters = User.updateOne.mock.calls.map(([filter]) => filter);
    expect(filters.every((f) => f.username === credentials.username)).toBe(true);
    expect(User.updateOne.mock.calls.map(([, update]) => update)).toEqual([
      { $addToSet: { 'interests.subjects': 'Health' } },
      { $pull: { 'interests.subjects': 'Health' } },
      { $addToSet: { bookmarks: { bill_id: 'hr1-117' } } },
      { $pull: { bookmarks: { bill_id: 'hr1-117' } } },
    ]);
  });
});
