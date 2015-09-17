angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',  function($stateProvider, 
    $locationProvider, $urlRouterProvider) {
    $stateProvider
      .state('dom4gs', {
        url: '',
        templateUrl:'gameAdmin/gameAdmin.html', 
        controller: 'GameAdminController'
      })
      .state('gameManager', {
        url:'/gameManager?gameid&password',
        templateUrl: 'gameManager/gameManager.html', 
        controller: 'GameManagerController'
      })
      .state('gameAdmin', {
        url:'/gameAdmin',
        templateUrl: 'gameAdmin/gameAdmin.html',
        controller: 'GameAdminController'
      })
      .state('uploadMaps', {
        url:'/uploadMaps',
        templateUrl: 'uploads/uploadMaps.html',
        controller: 'MapsController'
      })
      .state('uploadMods', {
        url:'/uploadMods',
        templateUrl: 'uploads/uploadMods.html',
        controller: 'ModsController'
      })
      .state('files', {
        url:'/fileManager',
        templateUrl: 'uploads/fileManager.html'
      })
      ;

    $urlRouterProvider.otherwise('dom4gs');
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
  }]);
