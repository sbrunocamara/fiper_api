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


    console.log();

    // let filename = historyData.model.replaceAll(' ', "_").replace('/','')+'-'+moment().format("DD-MM-YY") + ".pdf";
    let filename ='teste'+ ".pdf";
    let pdf = await this.pdfWriter(filename, historyData);
   
    // response.status(200).send({
    //   historyData: values
   
    //  });


 


    // let pdf = this.pdfWriter(filename, content);

    // response.status(200).send({
    //   base64: await pdf,
    //   URL: Env.get("URL_FILES") + filename,
    //   filename: filename,
    // });


  }

  async pdfWriter(filename, content) {
    const PDFDocument = require("pdfkit");

    const pdfBuffer = await new Promise((resolve) => {
      const doc = new PDFDocument();

      doc.fontSize(18);
      doc.text("Dados do veículo",260, 30,"center");
      doc.fontSize(12);
      doc.text("Marca:  " + content.brand, 100, 68);
      doc.text("Modelo:  " + content.model, 100, 86);
      doc.text("Ano:  " + content.year, 100, 104);
      doc.text("Combustível:  " + content.fuel, 100, 122);
      doc.text("Código FIPE:  " + content.codeFipe, 100, 140);

      doc.image('C:/Users/bsbru/Downloads/pdfteste.jpg', 0, 15, {align: 'center',width: 630})
      // doc.text("Descricão:  " + content.projeto.descricao, 100, 104);

      let line = 144;
      doc.fontSize(18);
      doc.text("Histórico de valores", 250, 190);
      line = line + 18;
      doc.fontSize(12);
   
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
