# SportsSiren
Final project for Comp 426

## Startup Guide
1. `npm install` to install project dependencies
2. `npm serve` to launch the development express server
3. `npm start-dev` to launch the development react server

## API Guide
SportsSiren supports a CRUD API. This section serves as documentation for that: 

* #### /api 
    * ####   /api/create 
        * #### /api/create/registerUser
            * Creates an user on inital registration.
        * #### /api/create/sendEmail
            * Creates and sends an email to user.
        * #### /api/create/createSubscription
            * Creates a subscription object and populates it in MongoDB collection.
        * #### /api/create/loadNFLSZN
            * Creates a MongoDB collection with games in the NFL season.
            * Interfaces with SportsRadar API.
        * #### /api/create/sendSimulationText
            * Creates and sends a text for game simulation functionality.
        * #### /api/create/sendSimulationEmail
            * Creates and sends an email for game simulation functionality
    * ####   /api/read
        * #### /api/read/gameById/:gameId
            * Gets NFL game by ID
        * #### /api/read/nextUpcomingGame
            * Gets next NFL game from MongoDB with scheduled start greater than current time. 
        * #### /api/read/userSubscriptions/:email
            * Gets subscription objects for the current user.
        * #### /api/read/getWeeklyNFLGames/:week
            * Gets array of NFL games by week.
    * ####   /api/update 
        * ##### /api/update/NFLStandings
            * Updates the NFL standings in the database.
        * ##### /api/update/user/updatePassword
            * Updates the user's password.
        * ##### /api/update/user/updatePhone
            * Updates the user's phone number.
        * ##### /api/update/subscriptions
            * Updates the user's following games, teams, and notification thresholds for alerts.
    * ####   /api/delete 
        * ##### /api/deleteAccount
            * Deletes the user's account. 
        * ##### /api/deleteAccount
            * Deletes a game or team from the user's subscriptions. 

## Mockup of Front End 
![Mock Front End](https://raw.githubusercontent.com/AdamWinek/SportsSiren/master/sports%20siren%20mockup.jpeg)
