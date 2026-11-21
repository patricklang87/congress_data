<h1 align="center">LegisTracker</h1>

<p align="center">A webapp for following US legislators and legislative subjects at the federal level. I wrote this app to practice the creation of user profiles and the integration of 3rd party APIs in a React application</p>

## Screenshots

### Desktop

<img src="https://user-images.githubusercontent.com/73432960/132585738-5213db62-84b4-4963-addb-f6759479743b.JPG" alt="login" width="500"/>
<img src="https://user-images.githubusercontent.com/73432960/132585690-57cfcd57-ef63-4432-802d-93c880f98f76.JPG" alt="find legislators" width="500"/>
<img src="https://user-images.githubusercontent.com/73432960/132585745-93b61dd1-6618-4647-ae40-a24b7149f2bb.JPG" alt="recent bills" width="500"/>


### Mobile
![login_mobile](https://user-images.githubusercontent.com/73432960/132585762-97ef2377-3163-424e-9b8a-54562e101bed.JPG)
![my_legislators_mobile](https://user-images.githubusercontent.com/73432960/132585771-8ef15cc7-be4e-4d3f-b490-13eabca8dc14.JPG)

## Links

- [Repo](https://github.com/patricklang87/congress_data "LegisTracker Repo")

The app is not currently deployed.

## Features

- Find your senators and representative by address (Google Civic Information and MapQuest), or search by name, state and district
- Track legislators and legislative subjects, and bookmark bills
- Browse recent bills and votes from the ProPublica Congress API
- Accounts with Passport.js sessions and bcrypt-hashed passwords

## Project structure

```
├── server/
│   ├── server.js          # Express app, sessions, Passport
│   ├── passport-config.js # Local username/password strategy
│   ├── validation.js      # Joi validation for register/login
│   ├── routes/            # auth, userData (tracked interests), propublica, district, scraper
│   └── schemes/user.js    # Mongoose user model
└── client/                # Create React App front end (React, Redux Toolkit, React Router)
```


## Run the project

To run the project locally:

1. Install dependencies in both folders:
   ```bash
   npm install --prefix server
   npm install --prefix client
   ```
2. Create `server/.env`:
   ```
   PORT=4000
   DB_CONNECT=<MongoDB connection string>
   SESSION_SECRET=<any long random string>
   GOOGLE_API_KEY=<Google Civic Information API key>
   PROPUBLICA_KEY=<ProPublica Congress API key>
   MAPQUEST_KEY=<MapQuest API key>
   ```
   The client calls the API at `http://localhost:4000`, so set `PORT=4000`.
3. Run `npm start` in `server/` and in `client/`. The app opens at [http://localhost:3000](http://localhost:3000).

The client uses Create React App 4. On Node 17+, `npm start` in `client/` needs `NODE_OPTIONS=--openssl-legacy-provider`.

## Run the tests

```bash
npm test
```

- **Server** (Jest + Supertest): register/login validation, and the full Passport session flow (register, login, current user, logout) against an in-memory user model, plus tracking legislators, subjects and bookmarks.
- **Client** (React Scripts / Jest): the search and tracked-interests Redux slices.

Tests run on every push and pull request via GitHub Actions.

## Built with

- JavaScript
- Node
- NPM

### Frontend
- HTML
- CSS
- Axios
- React
- React-Router
- React-Spinners
- Redux


### Backend
- Mongoose
- PassportJS
- Bcrypt
- Express
- Express-Session
- Dotenv
- @hapi/joi
- Puppeteer

### Testing
- Jest
- Supertest

## Database

- MongoDB Cloud Atlas

## 3rd Party APIs

- Google Civics API
- ProPublica Congress API
- MapQuest API

## Other Resources

- Congress.gov
- The United States Project on Github

## Future Updates

- [ ] Simplify dashboard navigation layout.
- [ ] Create "Most Recent Votes" view for tracked legislators.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=LegisTracker "LegisTracker")
