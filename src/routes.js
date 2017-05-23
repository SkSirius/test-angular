export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('room', {
      url: '/',
      component: 'room'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    });
}
