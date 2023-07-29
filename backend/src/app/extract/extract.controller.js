require('dotenv').config()
const { request } = require('express')
const ExtractService = require('./extract.service')
const createError = require('http-errors')

const service = new ExtractService()

const extractFile = async (req, res) => {
  const resp = await service.extractToDB(req.file)
  return res.status(200).json({data: resp})
}

const getAll = async (req, res) => {
  try{
    const pag = req.query.pag;

    if(!pag) return res.status(400).json({message: 'É necessário o número da página: pag'})

    const resp = await service.getAll(pag)
    return res.status(200).json({data: resp})
  }catch(err){
    return res.status(500).json(err)
  }
}

const download = async (req, res) => {
  const client = req.params.id
  const filePath = await service.download(client)

  return res.download(filePath)
}


module.exports ={
  extractFile,
  getAll,
  download
};

