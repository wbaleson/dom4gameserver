angular
  .module('app')
  .controller('GameManagerController', ['$scope', '$state', 'Game', '$location', '$state', function($scope,
      $state, Game, $location, $state) {
    $scope.Games = [];
    $scope.newGame=null;
    $scope.Game=null;
    $scope.parameters=$location.search();

   // console.log("state param"+$stateParams)
    if($scope.parameters.hasOwnProperty('gameid')==true)
    {
      getGame({'id':$scope.parameters.gameid},function (){
      console.log($scope.newGame.password)});
      //setTimeout(function(){ console.log($scope.newGame.password); }, 2000);
      
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
        $state.go('gameAdmin');
        //$location.path('/gameAdmin');
//$state.reload();
//        $state.go($state.current, {}, {reload: true});
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
