import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GetValoresController from './GetValoresController';
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class MailController {


    async exportMail({ request, response }: HttpContextContract) {

        const vehicleType = request.param("vehicleType");
        const brandId = request.param("brandId");
        const modelId = request.param("modelId");
        const yearId = request.param("yearId");
        const codeFipe = request.param("codeFipe");

        let email = request.body().email

        if(email == undefined || email == null || email == "" ){
            return response.badRequest('Email is required')
        }
        
        await Mail.send((message) => {
            message
              .from(Env.get('SMTP_USERNAME'))
              .to(email)
              .subject('Welcome Onboard!')
              .htmlView('emails/welcome', { name: 'Virk' })
          })
    
    //     let historyData = await this.getValues(vehicleType,codeFipe,yearId).then((values) => {
    
    //  return values;    
    
    //     });




    }

    async getValues(vehicleType,codeFipe,yearId){

        let getValores = new GetValoresController();
        let values = await getValores.getHistoryExport(vehicleType,codeFipe,yearId);
    
        return values;
    
    
      }

      async sendMail(){



      }

    









}
