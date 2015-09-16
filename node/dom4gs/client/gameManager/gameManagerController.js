angular
  .module('app')
  .controller('GameManagerController', ['$scope', '$state', 'Game', '$location', '$state', function($scope,
      $state, Game, $location, $state) {
    $scope.parameters=$location.search();
    $scope.Games = [];
    $scope.Game={id:$scope.parameters.gameid};
    $scope.Temp={bool:true,password:'fuckoff'};
    //$scope.Temp.bool=true;
    //$scope.Temp.password='Game.password;'
setTimeout(function(){ 
              $scope.Temp.password=$scope.Game.password;
              $scope.$apply();
             }, 2000);

    if($scope.parameters.hasOwnProperty('gameid')==true)
    {
        check($scope.parameters.gameid, function(value){
          $scope.l=value;
          if(value==false) {
            $scope.Temp.bool=false;
            $scope.Temp.password=$scope.Game.password; 
          }
          else {
            $scope.Temp.bool=true;

          }
        })
        
        getGame({'id':$scope.parameters.gameid},function (){
      });
    }

    function getGame(id) {
          Game
            .findById(id, function(){
                console.log("suc")
            }, function(){ 
              console.log("Game doesn't exist, using blank template");
              //$scope.Game.id='a';
              
            })
            .$promise
            .then(function(res) {
              $scope.Game = res;
            }
            );
        }

    function check(id,cb) {
      Game
        .exists({'id':id})
        .$promise
        .then(function(res) {
          $scope.ex = res.exists;
          console.log(JSON.stringify(res.exists)+"inside check");
          cb(res.exists);
        });
    }

    $scope.chec = function(id, cb) {
      Game
        .exists({"id":id}), function(){
          console.log("check id exists");
          $scope.ex=true;
          cb(true);
        }, function() {
          $scope.ex=false;
          cb(false);
        }
      }

    $scope.addGame = function(obj) {
      Game
        .upsert(obj);
        $state.go('gameAdmin');
        }
        $scope.Temp.bool=true;

  }]);
