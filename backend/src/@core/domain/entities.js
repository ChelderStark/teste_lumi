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
      throw new Error(err)
    }
  }

  async findAll(pag, client, year){
    try{
      let result = []
      for(const cli of client){
        const { rows } = await db.query(`SELECT cli_id, cli_month, cli_file_name FROM lumi.cliente WHERE cli_number = $1 and cli_year = $2`, [cli.cli_number, year])
        result.push({
          cli_name: cli.cli_name,
          cli_number: cli.cli_number,
          cli_year: cli.cli_year,
          bills: rows
        })
      }
      return result;
    }catch(err){
      throw new Error(err)
    }
  }

  async findNumberCli(year){
    try{
      const {rows} = await db.query(`SELECT DISTINCT cli_number  FROM lumi.cliente`)
      let client = []
      for(const row of rows){
        const cli = await this.clientYear(row.cli_number, year);
        client.push(cli)
      }
      return client;
    }catch(err){
      throw new Error(err)
    }
  }

  async clientYear(cli_number, year){
    try{
      const {rows} = await db.query(`SELECT cli_number, cli_name, cli_year FROM lumi.cliente WHERE cli_number = $1 and cli_year = $2`, [cli_number, year])
      return rows[0];
    }catch(err){
      throw new Error(err)
    }
  }

  async countTotalRows(){
    const {rows} = await db.query(`SELECT COUNT(*) AS total FROM lumi.cliente`)
    return rows;
  }

  async findOne(cli_id) {
    try{
      const {rows} = await db.query(`SELECT cli_file_name from lumi.cliente WHERE cli_id = $1`, [cli_id])
      return rows;
    }catch(err){
      throw new Error(err)
    }

  }

}


module.exports = ClienteEntity;
