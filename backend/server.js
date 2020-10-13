const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')))




app.get('/api', (req, res) => {
    res.send('Dis da Server')
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})