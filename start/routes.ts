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

Route.group(() => {

  //Marcas routes
  Route.get('/marcas/carros', 'GetMarcasController.getMarcasCarros')
  Route.get('/marcas/motos', 'GetMarcasController.getMarcasMotos')
  Route.get('/marcas/caminhoes', 'GetMarcasController.getMarcasCaminhoes')

  //Modelos routes
  Route.get('/modelos/carros/:id', 'GetModelosController.getModelosCarros')
  Route.get('/modelos/motos/:id', 'GetModelosController.getModelosMotos')
  Route.get('/modelos/caminhoes/:id', 'GetModelosController.getModelosCaminhoes')

  //Anos routes
  Route.get('/anos/carros/:id/:idModelo', 'GetAnosController.getAnosCarros')
  Route.get('/anos/motos/:id/:idModelo', 'GetAnosController.getAnosMotos')
  Route.get('/anos/caminhoes/:id/:idModelo', 'GetAnosController.getAnosCaminhoes')

  //Valor routes
  Route.get('/valor/carros/:id/:idModelo/:idAno', 'GetValoresController.getValorCarros')
  Route.get('/valor/motos/:id/:idModelo/:idAno', 'GetValoresController.getValorMotos')
  Route.get('/valor/caminhoes/:id/:idModelo/:idAno', 'GetValoresController.getValorCaminhoes')

  //Historico routes
  Route.get('/valor/historico/motos/:fipeCode/:idAno', 'GetValoresController.getMotosHistory')
  Route.get('/valor/historico/carros/:fipeCode/:idAno', 'GetValoresController.getCarrosHistory')
  Route.get('/valor/historico/caminhoes/:fipeCode/:idAno', 'GetValoresController.getCaminhoesHistory')

  }).prefix('/api')
  
  // .middleware(['auth:api', 'authPerm'])
  
