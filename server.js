const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.MONGODB_URL;

const client = new MongoClient(url);
client.connect;

const express = require('express');
const bodyParser = require('body-parser');
const cors = requiere('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

    try
    {
        const db = client.db(''); //Need database name
        const existingUser = await db.collection('Users').findONe({ Login: login });
        if (existingUser)
        {
            return res.status(400).json({ error: 'Login name already taken.' });
        }
        
        const newUser = { FirstName:firstName, LastName:lastName, Login: login, Password: password };
        const result = db.collection('Users').insertOne(newUser);
        newUser.Id = result.insertedId;
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { Id: newUser.Id, FirstName: firstName, LastName: lastName, Login: login, Password: password, error: errror };
    res.status(200).json(ret);
});

app.post('/api/login', async(req, res, next) =>
{
    //incoming: login, password
    //outgoing: id, firstName, lastName, error

    var error = '';

    const{ login, password } = req.body;

    const db = client.db(''); //Need Database name
    const results = await d.collection('Users').find({Login: login, Password: password}).toArray();

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
        error = 'Invalid user name/password';''
    }

    var ret = { id:id, firstName:fn, lastName:ln, error:''};
});

app.post('/api/add', async(req, res, next) =>
{   
    // incoming
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