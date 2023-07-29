require('dotenv').config()
const db = require('../../@core/infra/database')
const PdfHelper = require('./helper/pdfHelper')
const ClienteEntity = require('../../@core/domain/entities')

class ExtractService {
  constructor(){
    this.pdf = new PdfHelper()
    this.client = new ClienteEntity()
  }

  async extractToDB(file){
    const extract = await this.pdf.extractPDF(file.filename);
    const parse = await this.pdf.parsePdfToJson(extract);
    const created = await this.client.create(parse, file.filename)

    return this.build(created[0]);
  }

  async getAll(pag){
    const clients = await this.client.findAll(pag)
    return Promise.all(clients.map(async (data) => {return this.build(data)}));
  }

  async download(cli_id){

    const filename = await this.client.findOne(cli_id)
    const filePath = process.env.PATH_FILES + filename[0].cli_file_name

    return filePath;
  }

  build(datas) {
    return {
      id: datas.cli_id,
      name: datas.cli_name,
      number_client: datas.cli_number,
      month: datas.cli_month,
      year: datas.cli_year,
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
      filename: datas.cli_file_name,
      created_at: datas.cli_created_at,
    }
  }

}

module.exports = ExtractService;
