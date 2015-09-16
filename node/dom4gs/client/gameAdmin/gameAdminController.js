angular
  .module('app')
  .controller('GameAdminController', ['$scope', '$state', 'Game', '$location', function($scope,
      $state, Game, $location) {
    $scope.Games = [];
    $scope.newGame='newgamescope';
    $scope.Game='gamescope';

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
    
   // getGame({'id':'a'});
   // $location.search('gameid');
    if($location.search('gameid')==true)
    {
    getGame({'id':'b'});
    }

    $scope.manage = function(id, pw) {
      console.log("bad"+id);
      console.log('/gameManager?gameid='+id+'&password='+pw);
     // $location.path( '/gameManager?gameid='+id+'&password='+pw);
      $state.go('gameManager', {gameid:id,password:pw});

      //LOGIC TO GO TO CONTROLLER AND PASS PW HERE
    }

    $scope.restartGame = function(id,pw) { 
      console.log("restarting game: "+id+" with password: "+pw); 
      Game
        .restartGame({gamename:id,password:pw});
    }
    
    $scope.newGame = function(id) {
      $state.go('gameManager',{gameid:id});
    }

    $scope.removeGame = function(item,pw) {
      if(Game.password==pw){
        Game
          .deleteById(item)
          .$promise
          .then(function() {
            getGames();
          });
      }
      else{
        console.log("bad pw");
      }
    };
  }]);
