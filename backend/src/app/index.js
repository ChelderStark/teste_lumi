const express = require('express')
const extractRouter = require('./extract/router')

const routes = express.Router()

routes.use('/api/v1/extract', extractRouter)


module.exports = routes;
