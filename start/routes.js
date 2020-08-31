'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'DII' }
})

Route.group(() => {
  //start api
  Route.get('/teachers','TeacherController.index')
  Route.get('/teachers/:id','TeacherCOntroller.show')
  Route.post('/teachers','TeacherController.store')

  Route.get('/groups','GroupController.index')
  Route.get('/groups','GroupController.show')
  Route.post('/groups','GroupController.store')

  Route.get('/students','StudentController.index')
  Route.get('/students','StudentController.show')
  Route.post('/students','StudentController.store')

  Route.get('/enrollments','EnrollmentController.index')
  Route.get('/enrollments','EnrollmentController.show')
  Route.post('/enrollments','EnrollmentController.store')


}).prefix('api/v1')