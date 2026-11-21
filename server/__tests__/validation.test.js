const { registerValidation, loginValidation } = require('../validation');

describe.each([
  ['registerValidation', registerValidation],
  ['loginValidation', loginValidation],
])('%s', (_, validate) => {
  it('accepts an email and a password of at least 6 characters', () => {
    expect(validate({ username: 'ada@example.com', password: 'secret' }).error).toBeUndefined();
  });

  it.each([
    [{ password: 'secret' }, /"username" is required/],
    [{ username: 'ada@example.com' }, /"password" is required/],
    [{ username: 'not-an-email', password: 'secret' }, /must be a valid email/],
    [{ username: 'ada@example.com', password: '123' }, /at least 6 characters/],
  ])('rejects %j', (data, message) => {
    expect(validate(data).error.details[0].message).toMatch(message);
  });
});
