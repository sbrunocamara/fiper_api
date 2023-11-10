/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('login', async ({ auth, request, response }) => {
  const user = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(user,password, {
      expiresIn: '3 days'
      
    })

    const userData = auth.use('api').user?.toJSON()

    let data = [
      token,
      userData
    ]

    return data

  } catch(_error) {
    return response.unauthorized('Invalid credentials')
  }
}).prefix('/api')

Route.post('checkLogin', async ({ auth, request, response }) => {

  const token = request.input('token')

  try {
    const login = await auth.use('api').authenticate()

    console.log(login)

    if(login){
      return response.ok('Valid token')
    }

  } catch(_error) {
    return response.unauthorized('Invalid credentials')
  }
}).prefix('/api')


Route.post('logout', async ({ auth, request, response }) => {


  try {

    const logout = await auth.use('api').logout()

    return await auth.use('api').check()

 

  } catch(_error) {
    return response.unauthorized('Invalid credentials')
  }
}).prefix('/api')





Route.group(() => {

  //Marcas routes
  Route.get('/brands/:vehicleType', 'GetMarcasController.getMarcas')

  // Route.get('/marcas/carros', 'GetMarcasController.getMarcasCarros')
  // Route.get('/marcas/motos', 'GetMarcasController.getMarcasMotos')
  // Route.get('/marcas/caminhoes', 'GetMarcasController.getMarcasCaminhoes')



  //Modelos routes
  Route.get('/models/:vehicleType/:brandId', 'GetModelosController.getModelos')

  // Route.get('/models/carros/:id', 'GetModelosController.getModelosCarros')
  // Route.get('/modelos/motos/:id', 'GetModelosController.getModelosMotos')
  // Route.get('/modelos/caminhoes/:id', 'GetModelosController.getModelosCaminhoes')

  //Anos routes
  Route.get('/years/:vehicleType/:brandId/:modelId', 'GetAnosController.getAnos')

  // Route.get('/anos/carros/:id/:idModelo', 'GetAnosController.getAnosCarros')
  // Route.get('/anos/motos/:id/:idModelo', 'GetAnosController.getAnosMotos')
  // Route.get('/anos/caminhoes/:id/:idModelo', 'GetAnosController.getAnosCaminhoes')

  //Valor routes
  Route.get('/value/:vehicleType/:brandId/:modelId/:yearId', 'GetValoresController.getValor')

  // Route.get('/valor/carros/:id/:idModelo/:idAno', 'GetValoresController.getValorCarros')
  // Route.get('/valor/motos/:id/:idModelo/:idAno', 'GetValoresController.getValorMotos')
  // Route.get('/valor/caminhoes/:id/:idModelo/:idAno', 'GetValoresController.getValorCaminhoes')

  //Historico routes
  Route.get('/values/history/:vehicleType/:codeFipe/:yearId', 'GetValoresController.getHistory')

  // Route.get('/valor/historico/motos/:fipeCode/:idAno', 'GetValoresController.getMotosHistory')
  // Route.get('/valor/historico/carros/:fipeCode/:idAno', 'GetValoresController.getCarrosHistory')
  // Route.get('/valor/historico/caminhoes/:fipeCode/:idAno', 'GetValoresController.getCaminhoesHistory')

  //Export routes
  Route.get('/values/history/:vehicleType/:codeFipe/:yearId/export/pdf', 'PdfMakersController.generate')


  }).prefix('/api')
  
  // .middleware(['auth:api', 'authPerm'])
  
