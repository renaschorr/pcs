const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    
    let visits = req.cookies.visits || 0;
    //let welcome;
    const username = req.cookies.username;
        visits++;
    res.cookie('visits', visits);
    // if (username) { i ended up doing this in the ejs
    //     welcome=`Welcome back  ${username}!`;
    // } else {
    //     welcome='Welcome!'
    // }
    //res.send(`${welcome}! You have visited this site ${visits} times.`);
    res.render('app', { username: username , visits: visits});
});


app.get('/setname', (req, res) => {
    //i ended up using ejs for this
   /*  res.send(` 
        <form method="POST" action="/setname">
            <label for="name">Enter your name:</label>
            <input type="text" id="name" name="name">
            <button type="submit">Submit</button>
        </form>
    `); */
    res.render('setname');
});


app.post('/setname', (req, res) => {
    const { name } = req.body;
    if (name) {
        res.cookie('username', name);
        res.redirect('/');
    } else {
        res.send('Please enter a name.');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
