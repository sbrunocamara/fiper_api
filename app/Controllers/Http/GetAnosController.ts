import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios');
import Env from '@ioc:Adonis/Core/Env'

export default class GetAnosController {

    async getAnos({ response,request }: HttpContextContract) {
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/'+request.param('vehicleType')+'/brands/'+request.param('brandId')+'/models/'+request.param('modelId')+'/years');
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }

    // async getAnosCarros({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getAnosMotos({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getAnosCaminhoes({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }






}
