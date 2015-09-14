angular
  .module('app')
  .controller('GameController', ['$scope', '$state', 'Game', '$location', function($scope,
      $state, Game, $location) {
    $scope.Games = [];
    $scope.newGame='newgamescope';
    $scope.Game='gamescope';

    params=$location.search();
    if(params.hasOwnProperty('gameid')==true)
    {
      getGame({'id':params.gameid});
//    setTimeout(function(){ console.log($scope.newGame); }, 2000);
      setTimeout(function(){ console.log($scope.newGame.password); }, 2000);
      console.log($scope.newGame.password);
    }

    function loadGame(id,pw) {
      game=getGame(id);
      if (game.password==pw)
        {$scope.newGame=game}
      else
      {
        console.log("INVALID PW");
      }
    }

    function getGames() {
      Game
        .find()
        .$promise
        .then(function(results) {
          $scope.Games = results;
        });
    }
    getGames();

    function getGame(id) {
      Game
        .findById(id)
        .$promise
        .then(function(res) {
          $scope.newGame = res;
        });
    }
  
    $scope.loadGame = function(game) {
      Game
        .findById(game.id)
        .$promise
        .then(function(rdes) {
          getGame({'id':game.id});
        });
    }
    $scope.addGame = function(obj) {
      Game
        .upsert(obj);
        //.$promise
        //.then(function(Game) {
        //  $scope.newGame = '';
        //  $scope.GameForm.content.$setPristine();
        //  $('.focus').focus();
          //getGames();
        }

    $scope.removeGame = function(item) {
      Game
        .deleteById(item)
        .$promise
        .then(function() {
          getGames();
        });
    };
  }]);
