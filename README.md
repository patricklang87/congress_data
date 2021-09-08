<h1 align="center">LegisTracker</h1>

<p align="center">A webapp for following US legislators and legislative subjects at the federal level. I wrote this app to practice the creation of user profiles and the integration of 3rd party APIs in a React application</p>

## Screenshots

### Desktop
![login](https://user-images.githubusercontent.com/73432960/132585738-5213db62-84b4-4963-addb-f6759479743b.JPG)
![find_legislators_nav](https://user-images.githubusercontent.com/73432960/132585690-57cfcd57-ef63-4432-802d-93c880f98f76.JPG)
![recent_bills_nav](https://user-images.githubusercontent.com/73432960/132585745-93b61dd1-6618-4647-ae40-a24b7149f2bb.JPG)


### Mobile
![login_mobile](https://user-images.githubusercontent.com/73432960/132585762-97ef2377-3163-424e-9b8a-54562e101bed.JPG)
![my_legislators_mobile](https://user-images.githubusercontent.com/73432960/132585771-8ef15cc7-be4e-4d3f-b490-13eabca8dc14.JPG)

## Links

- [Repo](https://github.com/patricklang87/congress_data "LegisTracker Repo") 


## Run the project

To run the project locally:

- Clone the file.
- Download all necessary dependencies into your project folder.
- Create API keys for Google Civics API, ProPublical Congress API, and MapQuest API and save them in a dotenv file on the back end. 
- Connect your backend to a MongoDB Database and save your access code to the dotenv file in the backend.
- Run 'npm start' both in the server directory and in the client directory. The project will open at [http://localhost:3000](http://localhost:3000) in the browser. The page will reload if you make edits.

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

- [ ] Deploy on Heroku.
- [ ] Simplify dashboard navigation layout.
- [ ] Create "Most Recent Votes" view for tracked legislators.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=LegisTracker "LegisTracker")
