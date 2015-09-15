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

    $scope.manage = function(id) {
      console.log("bad"+id);
      //LOGIC TO GO TO CONTROLLER AND PASS PW HERE
    }
    $scope.restart = function(id) {
      console.log("bad"+id);
      //LOGIC TO validate settings and restart game
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
