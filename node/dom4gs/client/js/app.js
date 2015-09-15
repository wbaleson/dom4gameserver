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
        templateUrl:'views/gameAdmin.html', 
        controller: 'GameAdminController'
      })
      .state('gameManager', {
        url:'/gameManager?gameid&password',
        templateUrl: 'views/gameManager.html', 
        controller: 'GameManagerController'
      })
      .state('gameAdmin', {
        url:'/gameAdmin',
        templateUrl: 'views/gameAdmin.html',
        controller: 'GameAdminController'
      })
      ;

    $urlRouterProvider.otherwise('dom4gs');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }]);
