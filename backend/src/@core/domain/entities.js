require('dotenv').config()
const db = require('../../@core/infra/database')
const { v4: uuidv4 } = require('uuid');

const client = [
  'cli_id',
  'cli_name',
  'cli_number',
  'cli_month',
  'cli_year',
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
  'cli_file_name',
  'cli_created_at',
]

class ClienteEntity {

  async create (cliente, filename) {
    try{
      const clientValues = Object.values(cliente)

      const uuid = uuidv4()
      const created_at = new Date()
      clientValues.unshift(uuid)
      clientValues.push(filename)
      clientValues.push(created_at)

      console.log(clientValues);

      const {rows} = await db.query(`INSERT INTO lumi.cliente (${client}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`, clientValues)
      return rows;

    }catch(err){
      console.log(err);
    }
  }

  async findAll(pag){
    const qtd = 10
    const pagNumber = (pag - 1 < 0 ? 0 : pag - 1) * qtd
    console.log(pag);
    const {rows} = await db.query(`SELECT * FROM lumi.cliente offset ${pagNumber} rows fetch next ${qtd} rows only`)
    return rows;
  }

  async countTotalRows(){
    const {rows} = await db.query()
    return rows;
  }

  async findOne(cli_id) {
    try{
      const {rows} = await db.query(`SELECT cli_file_name from lumi.cliente WHERE cli_id = $1`, [cli_id])
      return rows;
    }catch(err){

    }

  }

}


module.exports = ClienteEntity;
