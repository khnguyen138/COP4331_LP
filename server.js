const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

function hashStringToInt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash); // Return positive integer
};

async function generateUserIdFromMongo(login, db) {
    let userId = hashStringToInt(login);
    
    // Check if a user with this userId already exists.
    let existing = await db.collection('Users').findOne({ UserId: userId });
    // If a collision is found, increment until a unique userId is found.
    while (existing) {
      userId++;
      existing = await db.collection('Users').findOne({ UserId: userId });
    }
    return userId;
};

app.post('/api/register', async (req, res, next)=>
{
    //incoming: firstName, lastName, login, password
    //outgoing: userId, firstName, lastName, lo

    const { firstName, lastName, login, password } = req.body;

    if ( !firstName || !lastName || !login || !password )
    {
        return res.status(400).json({ error: 'All fields required'})
    }

    var error = '';
    let newUser;
    let userId;

    try
    {
        const db = client.db('COP4331Cards'); //Need database name
        const existingUser = await db.collection('Users').findOne({ Login: login });
        if (existingUser)
        {
            return res.status(400).json({ error: 'Login name already taken.' });
        }
        userId = await generateUserIdFromMongo(login, db);
        newUser = { Login: login, Password: password, FirstName:firstName, LastName:lastName, UserId: userId };
        const result = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { Login: login, Password: password, FirstName:firstName, LastName:lastName, UserId: userId, error: error };
    res.status(200).json(ret);
});

app.post('/api/login', async(req, res, next) =>
{
    //incoming: login, password
    //outgoing: id, firstName, lastName, error

    var error = '';

    const{ login, password } = req.body;

    const db = client.db('COP4331Cards'); //Need Database name
    const results = await db.collection('Users').find({Login: login, Password: password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    if(results.length > 0)
    {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName
    }
    else
    {
        error = 'Invalid user name/password';
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
});

app.post('/api/add', async(req, res, next) =>
{   
    // incoming:
    // outgoing:
    var error = '';
    const { userId, date, location, time } = req.body;
});

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.listen(5000);