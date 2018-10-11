'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

/* Site Routes */
Route.group(() => {
    Route.get('/', 'WebSiteController.index');
    Route.get('/login', 'WebSiteController.login');
    Route.post('/login', 'AuthController.processlogin');
    Route.get('/forgotpassword', 'WebSiteController.forgotpassword');
    Route.post('/forgotpassword', 'AuthController.forgotpassword');
    Route.get('/reset/:code', 'AuthController.resetpassword').as('resetpassword');
    Route.get('/logout', 'WebSiteController.logout');
    Route.get('/register', 'WebSiteController.register');
    Route.post('/register', 'AuthController.processregister');
    Route.get('/submittoken', 'WebSiteController.submittoken');
    Route.post('/submittoken', 'WebSiteController.processsubmittoken');
    Route.get('/terms', 'WebSiteController.terms');
    Route.get('/privacy', 'WebSiteController.privacy');
    Route.get('/404', 'WebSiteController.404');    

})

