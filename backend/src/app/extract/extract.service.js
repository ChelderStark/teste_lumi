require('dotenv').config()
const db = require('../../@core/infra/database')
const PdfHelper = require('./helper/pdfHelper')
const ClienteEntity = require('../../@core/domain/entities')
const { v4: uuidv4 } = require('uuid');

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

class ExtractService {
  constructor(){
    this.pdf = new PdfHelper()
    this.client = new ClienteEntity()
  }

  async extractToDB(file){
    const extract = await this.pdf.extractPDF(file.filename);
    const parse = await this.pdf.parsePdfToJson(extract);
    const created = await this.client.create(parse)

    return this.build(created[0]);
  }

  async getAll(){
    const {rows} = await db.query('SELECT * FROM lumi.cliente')
    await db.end()
    return rows;
  }

  build(datas) {
    return {
      id: datas.cli_id,
      name: datas.cli_name,
      month: datas.cli_month,
      due_date: datas.cli_due_date, //? vencimento
      ee_kwh: datas.cli_ee_kwh, //? energia eletrica
      ee_unitvalue: datas.cli_ee_unitvalue,
      ee_total: datas.cli_ee_total,
      ij_kwh: datas.cli_ij_kwh, //? energia injetada
      ij_unitvalue: datas.cli_ij_unitvalue,
      ij_total: datas.cli_ij_total,
      icms_kwh: datas.cli_icms_kwh, //? sem ICMS
      icms_unitvalue: datas.cli_icms_unitvalue,
      icms_total: datas.cli_icms_total,
      public: datas.cli_public, //? contribuição municipal
      total: datas.cli_total,
      created_at: datas.cli_created_at,
    }
  }

}

module.exports = ExtractService;
