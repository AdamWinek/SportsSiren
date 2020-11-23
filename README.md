![logo](https://sports-siren.herokuapp.com/static/media/logo.a5162b21.svg)

# SportsSiren (COMP 426 Final Project)
SportsSiren is a notification app that allows you to follow your favorite teams and games so you never miss a second of the action. Configure custom time and score thresholds to receive a notification so that you can tune in to the closest games you care about. Sign up today!

## Technical Overview
- **Front-end** ----> React
- **Back-end** ----> Exprepss
- **Database** -----> MongoDB + Mongoose
- **3rd Party API's** -----> [SportsRadar](https://developer.sportradar.com/docs/read/american_football/NFL_v5), the official [NFL live scores API](http://static.nfl.com/liveupdate/scores/scores.json), [Twilio's SMS API](https://www.twilio.com/docs/sms/api), and [SendGrid's email API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html).
* **Hosting** -----> Heroku
## API Documentation
SportsSiren supports a CRUD API. This section serves as documentation for that: 

The API is split into two files; backend/internal_api.js and backend/external_api.js. The external functions interface with one of our four 3rd party API's: [SportsRadar](https://developer.sportradar.com/docs/read/american_football/NFL_v5), the official [NFL live scores API](http://static.nfl.com/liveupdate/scores/scores.json), [Twilio's SMS API](https://www.twilio.com/docs/sms/api), and [SendGrid's email API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html). The API 


- #### /api 
    - ####   /api/create 
        - #### /api/create/registerUser
            - Creates an user on inital registration.
            - Parameters: Creates an user on inital registration.
        - #### /api/create/sendEmail
            - Creates and sends an email to user.
        - #### /api/create/createSubscription
            - Creates a subscription object and populates it in MongoDB collection.
        - #### /api/create/loadNFLSZN
            - Creates a MongoDB collection with games in the NFL season.
            - Interfaces with SportsRadar API.
        - #### /api/create/sendSimulationText
            - Creates and sends a text for game simulation functionality.
        - #### /api/create/sendSimulationEmail
            - Creates and sends an email for game simulation functionality
    - ####   /api/read
        - #### /api/read/gameById/:gameId
            - Gets NFL game by ID
        - #### /api/read/nextUpcomingGame
            - Gets next NFL game from MongoDB with scheduled start greater than current time. 
        - #### /api/read/userSubscriptions/:email
            - Gets subscription objects for a user by email.
        - #### /api/read/getWeeklyNFLGames/:week
            - Gets array of NFL games by week.
    - ####   /api/update 
        - ##### /api/update/NFLStandings
            - Updates the NFL standings in the database.
        - ##### /api/update/user/updatePassword
            - Updates the user's password.
        - ##### /api/update/user/updatePhone
            - Updates the user's phone number.
        - ##### /api/update/user/subscriptions
            - Updates the user's following games, teams, and notification thresholds for alerts.
    - ####   /api/delete 
        - ##### /api/deleteAccount
            - Deletes the user's account. 
        - ##### /api/deleteAccount
            - Deletes a game or team from the user's. 

## Startup Guide
1. `npm install` to install project dependencies
2. `npm serve` to launch the development express server
3. `npm start-dev` to launch the development react server

## Mockup of Front End 
![Mock Front End](https://raw.githubusercontent.com/AdamWinek/SportsSiren/master/sports%20siren%20mockup.jpeg)
