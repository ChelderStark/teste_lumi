require('dotenv').config()
const db = require('../../@core/infra/database')
const { v4: uuidv4 } = require('uuid');
const AppError = require('../errors/AppError');

const client = [
  'cli_id',
  'cli_name',
  'cli_month',
  'cli_due_date',
  'cli_ee_kwh',
  'cli_ee_unitvalue',
  'cli_ee_total',
  'cli_ij_kwh',
  'cli_ij_unitvalue',
  'cli_ij_total',
  'cli_icms_kwh',
  'cli_icms_unitvalue',
  'cli_icms_total',
  'cli_public',
  'cli_total',
  'cli_created_at',
]

class ClienteEntity {

  async create (cliente) {
    try{
      const clientValues = Object.values(cliente)

      const uuid = uuidv4()
      const created_at = new Date()
      clientValues.unshift(uuid)
      clientValues.push(created_at)

      const {rows} = await db.query(`INSERT INTO lumi.cliente (${client}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`, clientValues)

      return rows;

    }catch(err){
      throw new AppError('Error to try create client')
    }
  }

}


module.exports = ClienteEntity;
