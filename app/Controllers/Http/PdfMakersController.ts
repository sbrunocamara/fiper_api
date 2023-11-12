import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import fs from "fs";
import Env from "@ioc:Adonis/Core/Env";
import moment from "moment";

import { Buffer } from "buffer";

import GetValoresController from "./GetValoresController";



export default class PdfMakersController {

  public async generate({ request, response }: HttpContextContract) {

    const vehicleType = request.param("vehicleType");
    const brandId = request.param("brandId");
    const modelId = request.param("modelId");
    const yearId = request.param("yearId");
    const codeFipe = request.param("codeFipe");
    

    let historyData = await this.getValues(vehicleType,codeFipe,yearId).then((values) => {

 return values;    

    });


    let filename = historyData.model.replaceAll(' ', "_").replace('/','')+'-'+moment().format("DD-MM-YY") + ".pdf";
    let pdf = await this.pdfWriter(filename, historyData);
   

    response.status(200).send({
      base64: await pdf,
      URL: Env.get("URL_FILES") + filename,
      filename: filename,
    });


  }

  async pdfWriter(filename, content) {
    const PDFDocument = require("pdfkit");

    const pdfBuffer = await new Promise((resolve) => {
      const doc = new PDFDocument();

      doc.image('files/pdfModel.jpg', -3, 15, {align: 'center',width: 630})
 
      doc.fontSize(12);
      doc.fillColor('white')

      doc.text(content.brand+' '+content.model, 75, 110);

      doc.text(content.brand, null, 175, 
        {
        align: 'left',
      }
      );


      doc.text(content.model,null, 227, 
        {
        align: 'left'
      }
      );

      doc.text(content.modelYear, null, 279, 
        {
        align: 'left'
        
      }
      );

      doc.text(content.fuel, null, 331, 
        {
        align: 'left'
      }
      );

      doc.fillColor('white')
      let lineValue = 415 //includes 73
      let lineMonth = 389 //includes 73

      content.priceHistory.forEach(element => {

        lineMonth = lineMonth + 73
        lineValue = lineValue + 73

        doc.text(element.month, 250, lineMonth)
        doc.text(element.price, 255, lineValue)
      
      }); 

      doc.end();


      //Finalize document and convert to buffer array
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = new Uint8Array(Buffer.concat(buffers));
        resolve(pdfData);
      });
    });

    var base64String = btoa(
      String.fromCharCode.apply(null, new Uint8Array(pdfBuffer as any))
    );

    fs.open(Env.get("FILE_DIR") + filename, "w", function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    });

    fs.writeFile(
      Env.get("FILE_DIR") + filename,
      base64String,
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );

    return base64String;
  }

  async getValues(vehicleType,codeFipe,yearId){

    let getValores = new GetValoresController();
    let values = await getValores.getHistoryExport(vehicleType,codeFipe,yearId);

    return values;


  }

  async htmlPdf(){


}

}