require('dotenv').config()
const express = require('express')
const upload = require('./utils/file-storage')
const files = require('./extract.controller')

const extractRouter = express.Router();

extractRouter.post('/upload', upload.single('file'), files.extractFile)
extractRouter.get('/', (req, res) => res.status(200).send('Router funcionando!'))

module.exports = extractRouter;
