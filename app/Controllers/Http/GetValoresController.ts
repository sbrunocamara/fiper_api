import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios');
import Env from '@ioc:Adonis/Core/Env'

export default class GetValoresController {

    async getValorCarros({ response,request }: HttpContextContract) {
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }

    async getValorMotos({ response,request }: HttpContextContract) {
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }

    async getValorCaminhoes({ response,request }: HttpContextContract) {
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/brands/'+request.params().id+'/models/'+request.params().idModelo+'/years/'+request.params().idAno);
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }

    async  getMotosHistory({ response,request }: HttpContextContract) {

        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }

    }

    async  getCarrosHistory({ response,request }: HttpContextContract) {
            
            try{
                const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
                return response.json(data.data);
            }catch(error){
                return response.json(error);
            }
    }

    async  getCaminhoesHistory({ response,request }: HttpContextContract) {
            
        try{
            const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/'+request.params().fipeCode+'/years/'+request.params().idAno+'/history');
            return response.json(data.data);
        }catch(error){
            return response.json(error);
        }
    }


}
