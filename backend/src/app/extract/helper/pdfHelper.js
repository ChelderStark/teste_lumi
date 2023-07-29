require('dotenv').config()
const pdfReader  = require('pdfreader');

class PdfHelper {

  async extractPDF(fileName){
    const file = process.env.PATH_FILES + fileName

    return new Promise((resolve, reject) => {
    let pages = []
    new pdfReader.PdfReader().parseFileItems(file, (err, item) => {
      if(err){
        reject(err)
      }else if(!item){
        resolve(pages)
      }else if(item.page){
        pages.push({})
      }else if(item.text){
        const row = pages[pages.length-1][item.y] || [];
        row.push(item.text);
        pages[pages.length-1][item.y] = row
      }
    });
  });
  }

  async parsePdfToJson(pages){
    const page = pages[0];

    const fields = {
      client: { row: '3.103', index: 0 },
      numberCli: {row: '9.272', index: 0},
      month: { row: '47.841', index: 0 },
      year: { row: '47.841', index: 0 },
      dueDate: { row: '46.828', index: 2 },
      eeKWH: { row: '14.856', index: 2 },
      eeUnitValue: { row: '14.856', index: 3 },
      eeTotal: { row: '14.856', index: 4 },
      ijKWH: { row: '15.456', index: 2 },
      ijUnitValue: { row: '15.456', index: 3 },
      ijTotal: { row: '15.456', index: 4 },
      icmsKWH: { row: '16.056', index: 2 },
      icmsUnitValue: { row: '16.056', index: 3 },
      icmsTotal: { row: '16.056', index: 4 },
      public: { row: '16.656', index: 1 },
      total: { row: '17.256', index: 1 },
    };

    const data = {}

    Object.keys(fields).forEach((key) => {
      const field = fields[key];
      const val = page[field.row][field.index];

      data[key] = val;
    })

    const date = data.month.split('/')
    data.month = date[0]
    data.year = date[1]

    const number = data.numberCli.replace('  ', '').split(' ')
    data.numberCli = number[0]

    data.eeKWH = data.eeKWH.trim()
    data.eeUnitValue = data.eeUnitValue.trim().replace('.', '').replace(',', '.')
    data.eeTotal = data.eeTotal.trim().replace('.', '').replace(',', '.')
    data.ijKWH = data.ijKWH.trim()
    data.ijUnitValue = data.ijUnitValue.trim().replace('.', '').replace(',', '.')
    data.ijTotal = data.ijTotal.trim().replace('.', '').replace(',', '.')
    data.icmsKWH = data.icmsKWH.trim()
    data.icmsUnitValue = data.icmsUnitValue.trim().replace('.', '').replace(',', '.')
    data.icmsTotal = data.icmsTotal.trim().replace('.', '').replace(',', '.')
    data.public = data.public.trim().replace('.', '').replace(',', '.')
    data.total = data.total.trim().replace('.', '').replace(',', '.')



    return data;
  };

}

module.exports = PdfHelper;

