const express = require('express')
const bodyParser = require('body-parser')
const Articles = require('../models/article')

const newspapersRouter = express.Router()

newspapersRouter.use(bodyParser.json())

function setOptions(queryPage, queryLimit){

    let options = {
        sort: { date: -1 },
        offset: 0,
        limit: 10
    }

    if (queryPage && queryLimit){
        options.offset = queryPage * queryLimit
        options.limit = queryLimit
    }
    else if(queryPage){
        options.offset = queryPage * 10
    }
    else if(queryLimit){
        options.limit = queryLimit
    }

    return options;
}

newspapersRouter.route('/theguardian')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "theguardian" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

newspapersRouter.route('/aljazeera')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "aljazeera" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })


newspapersRouter.route('/bbc')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "bbc" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

newspapersRouter.route('/independentuk')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "independentuk" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

newspapersRouter.route('/thetimes')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "thetimes" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })


newspapersRouter.route('/surgeactivism')
.get((req, res) => {

    let options = setOptions(req.query.page, req.query.limit)

    Articles.paginate({ "source": "surgeactivism" }, options)
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles);
        })
        .catch((err) => console.log(err))
})


newspapersRouter.route('/veganuary')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "source": "veganuary" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })


newspapersRouter.route('/plantbasednews')
.get((req, res) => {

    let options = setOptions(req.query.page, req.query.limit)

    Articles.paginate({ "source": "plantbasednews" }, options)
        .then((articles) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(articles);
        })
        .catch((err) => console.log(err))
})

module.exports = newspapersRouter;