import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios');
import Env from '@ioc:Adonis/Core/Env'

export default class GetValoresController {

    async getValor({ response,request }: HttpContextContract) {
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/'+request.param('vehicleType')+'/brands/'+request.param('brandId')+'/models/'+request.param('modelId')+'/years/'+request.param('yearId'));
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }

    
    async getHistory({ response,request }: HttpContextContract) {


       
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/'+request.param('vehicleType')+'/'+request.param('codeFipe')+'/years/'+request.param('yearId')+'/history');
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }

    }

        
    async getHistoryExport(vehicleType,codeFipe,yearId) {


       
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/'+vehicleType+'/'+codeFipe+'/years/'+yearId+'/history');

            return data.data;

        }catch(error){
            
        }

    }




    // async getValorCarros({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getValorMotos({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async getValorCaminhoes({ response,request }: HttpContextContract) {
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }

    // async  getMotosHistory({ response,request }: HttpContextContract) {

    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }

    // }

    // async  getCarrosHistory({ response,request }: HttpContextContract) {
            
    //         try{
    //             const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
    //             return response.json(data.data);
    //         }catch(error){
    //             return response.json(error);
    //         }
    // }

    // async  getCaminhoesHistory({ response,request }: HttpContextContract) {
            
    //     try{
    //         const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
    //         return response.json(data.data);
    //     }catch(error){
    //         return response.json(error);
    //     }
    // }


}
