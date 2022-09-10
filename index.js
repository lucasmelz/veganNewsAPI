const PORT = 8000

const express = require('express')
const mongoose = require('mongoose')

const CronJob = require('cron').CronJob;

const initializeDatabase = require('./iniatializeDatabase')
const updateDatabase = require('./updateDatabase')
const authenticate = require('./authenticate')

const Articles = require('./models/article')

const app = express()

const newspapersRouter = require('./routes/newspapersRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb')

const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json())

const url = 'mongodb://localhost:27017/newsTest';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to database');
}, (err) => { console.log(err); })

mongoose.syncIndexes()

app.listen(PORT, () => { console.log("SERVER RUNNING ON PORT: " + PORT) })

function init() {
    Articles.find({}).count()
        .then((numberOfArticles) => {
            setTimeout(() => { }, 60)
            if (numberOfArticles < 1500) {
                initializeDatabase();
            }
            else {
                console.log("Database already initialized.")
            }
        })
        .catch(err => init())
}

init()

const job = new CronJob('0 * * * *', function () {
    updateDatabase();
}, null, true, 'America/Los_Angeles'); 

job.start();

function setOptions(queryPage, queryLimit) {

    let options = {
        sort: { date: -1 },
        offset: 0,
        limit: 10
    }

    if (queryPage && queryLimit) {
        options.offset = queryPage * queryLimit
        options.limit = queryLimit
    }
    else if (queryPage) {
        options.offset = queryPage * 10
    }
    else if (queryLimit) {
        options.limit = queryLimit
    }

    return options;
}

app.get('/allArticles', (req, res) => {

    let options = setOptions(req.query.page, req.query.limit)

    Articles.paginate({}, options)
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles);
        })
        .catch((err) => console.log(err))

})

app.post('/post', (req, res) => {

    if (authenticate(req.query.d, req.query.m, req.query.y)) {
        Articles.create(req.body)
            .then((art) => {
                res.statusCode = 200
                console.log("Article " + art.title.substring(0, 20) + " successfully posted.")
                res.setHeader('Content-Type', 'application/json')
                res.json(art)
            }, (err) => {
                console.log(err)
                res.statusCode = 500
                res.send(err.toString())
            })
            .catch(err => {
                console.log(err)
                res.statusCode = 500
                res.send(err.toString())
            })

    }
    else {
        res.statusCode = 401;
        res.end("Post operation not authorized")
    }

})

app.get('/search/:query', (req, res) => {

    let options = setOptions(req.query.page, req.query.limit)

    Articles.paginate({
        $or: [
            { "title": { $regex: req.params.query } },
            { "description": { $regex: req.params.query } },
            { "url": { $regex: req.params.query } },
            { "author": { $regex: req.params.query } },
            { "categories": { $regex: req.params.query } }
        ]
    }, options)
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles);
        })
        .catch((err) => console.log(err))

})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use('/categories', categoriesRouter);
app.use('/newspapers', newspapersRouter);