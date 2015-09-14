angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, 
    $locationProvider, $urlRouterProvider) {
    $stateProvider
      .state('dom4gs', {
        url: '',
        views: {
          'gameManager': {templateUrl: 'views/gameManager.html', controller: 'GameController'},
          'gameAdmin': { templateUrl:'views/gameAdmin.html', controller: 'GameAdminController'}
        }
      });

    $urlRouterProvider.otherwise('dom4gs');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }]);
