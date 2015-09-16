angular
  .module('app')
  .controller('GameAdminController', ['$scope', '$state', 'Game', '$location', '$timeout', function($scope,
      $state, Game, $location, $timeout) {
    $scope.Games = [];
    $scope.newGame='newgamescope';
    $scope.Game='gamescope';
    $scope.Temp={};
    $scope.Temp.badpw=false;
    $scope.Temp.removed=false;

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

    $scope.removeGame = function(id,pw) {
      if(pw!=undefined) {
        Game
          .removeGame({gamename:id,password:pw})
          .$promise
          .then(function(res) {
            console.log(res);
            $scope.Temp.res=res;
            if(res.response=='Incorrect password') {
              $scope.Temp.badpw=true;
              $scope.Temp.removed=false;
            }
            else
            {
              $scope.Temp.removed=true;
              $scope.Temp.badpw=false;
            }
            //$timeout(angular.noop);
            //$timeout(function(){console.log($scope.Temp.badpw);$scope.$apply();})
            console.log($scope.Temp.badpw);
            getGames();
          });
        }
        else{
          console.log('need to set password');
        }
      }
  }]);
