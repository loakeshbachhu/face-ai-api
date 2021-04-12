const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id : '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id : '124',
            name: 'Sally',
            email: 'yoo@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@email.com'
        }
    ]
}
//Routing
app.get('/', (req, res) => {
    res.json(database.users);
})

app.listen(4000, () => {
    console.log('app is running on port 4000');
})

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", "$2a$10$PDlIswJHT83wXcC6.3cMeuCMRghpD/.yVT6Vo1ML/7X3n0V6IWdDK", function(err, res) {
        console.log("first Response" , res)
    });
    bcrypt.compare("veggies", "$2a$10$PDlIswJHT83wXcC6.3cMeuCMRghpD/.yVT6Vo1ML/7X3n0V6IWdDK", function(err, res) {
        console.log("first Response" , res)
    });
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    }else{
        res.status(400).json('error signing in');
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    database.users.push({
        id : '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const {id } = req.params;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            res.json(user);
            found = true;
        }
    })
    if(!found){
        res.status(404).json("no such user..")
    }
})

app.put('/image', (req, res) => {
    const {id } = req.body;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            user.entries++;
            found = true;
            return  res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json("no such user..")
    }
})

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
/*
1. res -> This is working
2. /Signin -> POST = Succes/Fail
3. /Register -> POST = user
4. /profile/:userid -> GET = user
5. /image -> PUT -> user

*/