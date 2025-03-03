const MongoClient = require('mongodb').MongoClient;
const url = ""; //Need mongodb url

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
    //outgoing:

    const { firstName, lastName, login, password } = req.body;

    if ( !firstName || !lastName || !login || !password)
    {
        return res.status(400).json({ error: 'All fields required'})
    }

    const newUser = { UserId:userId, FirstName:firstName, LastName:lastName, Login: login, Password: password };
    var error = '';

    try
    {
        const db = client.db(''); //Need database name
        const result = db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
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

app.listen(5000);