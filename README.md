![logo](https://sports-siren.herokuapp.com/static/media/logo.a5162b21.svg)

# SportsSiren (COMP 426 Final Project)
SportsSiren is a notification app that allows you to follow your favorite teams and games so you never miss a second of the action. Configure custom time and score thresholds to receive a notification so that you can tune in to the closest games you care about. Sign up today!

SportsSiren continuously updates the scores of active NFL games and notifies the user based off of their preferences. The user can follow both teams and individual games and configure notification preferences for each. SportsSiren currently allows the user to be notified at the start of the game, end of the game, and with a certain time remaining if the score is within a user-defined threshold. 

# Use Case

You are John Smith. Avid football fan but always busy on Sundays. You want to be reminded when games that you care about start and want to be able to watch the most exciting game. SportsSiren lets you get the notifications that YOU care about. Want to watch the Patriots game if the score is within a touchdown? A field goal? Want to get alerts on your email and/or your phone? SportsSiren meets all of these needs, alerting you of the sports events you care about. 

# Technical Details 

Putting together SportsSiren was a lot of fun. Here are some of the details: 
## Technical Overview
- **Front-end** ----> React
- **Back-end** ----> Express/Node
- **Database** -----> MongoDB + Mongoose
- **3rd Party API's** -----> [SportsRadar's NFL API](https://developer.sportradar.com/docs/read/american_football/NFL_v5), the official [NFL live scores API](http://static.nfl.com/liveupdate/scores/scores.json), [Twilio's SMS API](https://www.twilio.com/docs/sms/api), and [SendGrid's email API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html).
- **Hosting + CI/CD** -----> Heroku
## API Documentation
SportsSiren supports a CRUD API. This section serves as documentation for that: 

The API is split into two files; backend/internal_api.js and backend/external_api.js. The external functions interface with one of our four 3rd party API's: [SportsRadar](https://developer.sportradar.com/docs/read/american_football/NFL_v5), the official [NFL live scores API](http://static.nfl.com/liveupdate/scores/scores.json), [Twilio's SMS API](https://www.twilio.com/docs/sms/api), and [SendGrid's email API](https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html). The API 


## API Overview
```
/api
    /create
        /registerUser
        /sendEmail
        /createSubscription
        /loadNFLSZN
        /sendSimulationText
        /sendSimulationEmail
    /read
        /gameById/:gameId
        /nextUpcomingGame
        /userSubscriptions/:email
        /getWeeklyNFLGames/:week
    /update 
        /updateStandingsNFL
        /user/updatePassword
        /user/updatePhone
        /user/subscriptions
    /delete 
        /deleteAccount
        /subscriptions
```
### Create
```
/api/create
    /registerUser
        Parameters: 
                fname: "John", (String), 
                lname: "Smith", (String),
                email: "johnsmith@unc.edu", (String), 
                phone: "123-456-7890", (String),
                password: "$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy" (bcryptHash)
        Effect: 
                Registers user in database. 
    /sendEmail
        Parameters: 
                message: "This is a test message" (String), 
                to: "test@unc.edu" (String)
        Effect: 
                Registers user in database. 
    /createSubscription
        Parameters: 
                type: "game", (String),
                fname: "John", (String), 
                lname: "Smith", (String),
                email: "johnsmith@unc.edu", (String), 
                phone: "123-456-7890", (String),
                identifier: "565ff61b-eeb1-4caa-b1cd-b29ce3a59737" (GameIdentifier),
                notifiedGames: ["NE-LA", "CAR-NYJ"] (Array of Games), 
                viaEmail: true, (Boolean), 
                viaText: false, (Boolean), 
                onStart: true, (Boolean), 
                onEnd: false, (Boolean), 
                scoreCriteria: 10, (Number), 
                timeCriteria: 15, (Number) 
        Effect: 
                Adds subscription object to database. 
    /loadNFLSZN
        Parameters: 
                None
        Effect: 
                Populates NFL_season collection in MongoDB backend.
    /sendSimulationText
        Parameters: 
                phone: "123-456-7890", (String),
                message: "This is a test message" (String)
        Effect: 
                Sends a text to user for testing.
    /sendSimulationEmail
        Parameters: 
                email: "johnsmith@unc.edu", (String), 
                message: "This is a test message" (String)
        Effect: 
                Sends an  email to user for testing.
```

### Read
```
/api/read
    /gameById/:gameId
        Parameters: 
            gameId: "NE-BAL", (String)
        Effect: 
            Returns an NFL_Game object. 
    /nextUpcomingGame
        Parameters: 
            None
        Effect: 
            Returns the next upcoming NFL_Game object. 
    /userSubscriptions/:email
        Parameters: 
            None
        Effect: 
            Returns the subcription object(s) associated with that email. 
    /getWeeklyNFLGames/:week
        Parameters: 
            week: 10, (Number)
        Effect: 
            Returns an array of NFL_Game's for thaht week. 
```
### Update
```
/api/update
    /updateStandingsNFL
        Parameters: 
            None
        Effect: 
            Updates NFL standings from SportsRadar API. 
    /user/updatePassword
        Parameters: 
            old_password: "$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy" (bcryptHash),
            new_password: "$2b$10$//DXiVVE59p7G5k/4Klx/ezF7BI42QZKmoOD0NDvUuqxRE5bFFBLy" (bcryptHash)
            email: "johnsmith@unc.edu", (String) 
        Effect: 
            Updates the password associated with that user. Fails if old password is different than current password. 
    /user/updatePhone
        Parameters: 
            phone: "123-456-7890", (String),
            email: "johnsmith@unc.edu", (String) 
        Effect: 
            Updates the phone associated with that user. 
    /user/subscriptions
        Parameters: 
                type: "game", (String),
                fname: "John", (String), 
                lname: "Smith", (String),
                email: "johnsmith@unc.edu", (String), 
                phone: "123-456-7890", (String),
                identifier: "565ff61b-eeb1-4caa-b1cd-b29ce3a59737" (GameIdentifier),
                notifiedGames: ["NE-LA", "CAR-NYJ"] (Array of Games), 
                viaEmail: true, (Boolean), 
                viaText: false, (Boolean), 
                onStart: true, (Boolean), 
                onEnd: false, (Boolean), 
                scoreCriteria: 10, (Number), 
                timeCriteria: 15, (Number) 
        Effect: 
                Updates subscription object in database. 

```
### Delete
```
/api/delete
    /deleteAccount
        Parameters: 
            email: "johnsmith@unc.edu", (String)
        Effect: 
            Deletes user from database. Cannot be undone. 
    /subscriptions
        Parameters: 
            subscriptions: [Array_of_subscriptions_objects], (Array of Subscriptions)
        Effect: 
            Deletes those subscriptions. 


```



# Original Mockup of Front End 
![Mock Front End](https://raw.githubusercontent.com/AdamWinek/SportsSiren/master/sports%20siren%20mockup.jpeg)
