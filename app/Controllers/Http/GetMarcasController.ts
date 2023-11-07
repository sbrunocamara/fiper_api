import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios');
import Env from '@ioc:Adonis/Core/Env'

export default class GetMarcasController {

    async getMarcasCarros({ response,request }: HttpContextContract) {

      try{
        const data = await axios.get(Env.get('URL_API_FIPE')+'/cars/brands');

       return response.json(data.data);

      }catch(error){
        return response.json(error);
      }
    }

    async getMarcasMotos({ response,request }: HttpContextContract) {

      try{
        const data = await axios.get(Env.get('URL_API_FIPE')+'/motorcycles/brands');
        return response.json(data.data);
      }catch(error){
        return response.json(error);
      }
    }

    async getMarcasCaminhoes({ response,request }: HttpContextContract) {

      try{
        const data = await axios.get(Env.get('URL_API_FIPE')+'/trucks/brands');
        return response.json(data.data);
      }catch(error){
        return response.json(error);
      }
    }


















}
