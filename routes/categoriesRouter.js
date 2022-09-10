const express = require('express')
const bodyParser = require('body-parser')
const Articles = require('../models/article')

const categoriesRouter = express.Router()

categoriesRouter.use(bodyParser.json())

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

categoriesRouter.route('/business')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "business" },
                { "categories": "business and economy" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/health')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "health" },
                { "categories": "health & wellbeing" },
                { "categories": "mental health" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/environment')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "environment" },
                { "categories": "climate change" },
                { "categories": "global warming" },
                { "categories": "climate crisis" },
                { "categories": "climate" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/science')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "science" },
                { "categories": "science and technology" },
                { "categories": "neuroscience" },
                { "categories": "science technology" },
                { "categories": "medical research" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/economy')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "economy" },
                { "categories": "business and economy" },
                { "categories": "green economy" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/politics')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "politics" },
                { "categories": "politics law" },
                { "description": { $regex: "government" } },
                { "description": { $regex: "politician" } },
                { "description": { $regex: "protest" } }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/sport')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "sport" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })


categoriesRouter.route('/ethics')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "ethics" },
                { "categories": "animal welfare" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/books')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "categories": "books" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/film')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({ "categories": "film" }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/recipes')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate(
            { "url": { $regex: "recipe" } }, options
        )
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })

categoriesRouter.route('/technology')
    .get((req, res) => {

        let options = setOptions(req.query.page, req.query.limit)

        Articles.paginate({
            $or: [
                { "categories": "tech" },
                { "categories": "technology" },
                { "categories": "science technology" },
                { "categories": "science and technology" },
                { "categories": "biotechnology and bioengineering" }
            ]
        }, options)
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            })
            .catch((err) => console.log(err))
    })


module.exports = categoriesRouter;
