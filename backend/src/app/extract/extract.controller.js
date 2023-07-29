require('dotenv').config()
const ExtractService = require('./extract.service')

const service = new ExtractService()

const extractFile = async (request, response) => {
  const resp = await service.extractToDB(request.file)
  return response.status(200).json({data: resp})
}

const getAll = async (request, response) => {
  const resp = await service.getAll()

  return response.send({data: {mesage: resp}});
}


module.exports ={
  extractFile,
  getAll
};

