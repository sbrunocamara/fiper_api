import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios');
import Env from '@ioc:Adonis/Core/Env'

export default class GetModelosController {

    async getModelos({ response,request }: HttpContextContract) {
        
        try{

            const data = await axios.get(Env.get('URL_API_FIPE')+'/'+request.param('vehicleType')+'/brands/'+request.param('brandId')+'/models');

            return response.json(data.data);

        }catch(error){
            return response.json(error);
        }
    }


    // async getModelosCarros({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/brands/'+request.params().id+'/models');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getModelosMotos({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/brands/'+request.params().id+'/models');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getModelosCaminhoes({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/brands/'+request.params().id+'/models');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }
}
