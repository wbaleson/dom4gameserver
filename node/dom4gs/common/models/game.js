module.exports = function(Game) {

function validateSettings(instance) {
  //validate settings and make sure ok
  return "good";
}

function restartdom4(instance) {
  var a=startdom4(instance);
  a=stopdom4(instance);
  return a;
}

function startdom4(instance) {
  var cp = require ('child_process');
        var a = cp.exec('STARTDOM4', function(err, stdout, stderr){
          console.log(stdout);
        });
        instance.updateAttribute('pid',a.pid, function (err, object) { });
        instance.save({validate:false,throws:false}, function (err, instance) { });
        return a.pid;
 }

 function stopdom4(instance) {
   var cp = require ('child_process');
        var a = cp.exec('kill -9 '+instance.pid, function(err, stdout, stderr){
        });
        oldpid=instance.pid;
        instance.updateAttribute('pid',0, function (err, object) { });
        instance.save({validate:false,throws:false}, function (err, instance) { });
        return oldpid;
 }

 Game.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is ' + currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  }

 Game.getId = function(gamename, cb) {
    Game.findById( gamename, function (err, instance) {
        response = "Name of coffee shop is " + instance.id + instance.name + instance.toJSON();
        cb(null, response);
        console.log(response);
    });
  }

  Game.getName = function(gamename, cb) {
    Game.find({ where: {name: gamename}, limit: 1 }, function (err, models) {
    	if(typeof models[0] != 'undefined') {
        instance = models[0].toJSON();
          response = "Name of game is " + instance.name;
          response = instance;
        }
        else {
          response = 'Game with name '+gamename +'not found';
        }
        cb(null, response);
        console.log(response);
    });
  }

   Game.removeGame = function( gamename, password, cb) {
    Game.findById( gamename, function ( err, instance) {
      if(instance == null) {
        response = "Game not found.";
      }
      else if (instance.password!=password) {
        response = "Incorrect password";
      }
      else {
        response = "Deleting game " + gamename;
        Game.destroyById(gamename);
      }
    cb(null, response);
    });
  }

   Game.restartGame = function( gamename, password, cb) {
    Game.findById( gamename, function ( err, instance) {
      if(instance == null) {
        response = "Game not found.";
      }
      else if (instance.password!=password) {
        response = "Incorrect password";
      }
      else if (instance.pid == 0) {
        var pid = startdom4(instance);
        response = "we started the game with a pid of " + pid;
      }
      else {
        var pid = stopdom4(instance);
        pid = startdom4(instance);
        response = "We stopped then started the game with a pid of " + pid;
      }
    cb(null, response);
    });
  }
 

 Game.startGame = function( gamename, password, cb) {
    Game.findById( gamename, function ( err, instance) {
      if(instance == null) {
        response = "Game not found.";
      }
      else if (instance.password!=password) {
        response = "Incorrect password";
      }
      else if (instance.pid != 0) {
        response = "Game already running.";
      }
      else {
        var pid=startdom4(instance);
        console.log(pid);
        response = "We started the game with a pid of " + pid;
      }
    cb(null, response);
    });
  }

 Game.stopGame = function( gamename, password, cb) {
    Game.findById( gamename, function ( err, instance) {
      if(instance == null) {
        response = "Game "+gamename + " not found.";
      }
      else if (instance.password!=password) {
        response = "Incorrect password";
      }
      else if (instance.pid == 0) {
        response = "Game not running.";
      }
      else {
        stopdom4(instance);
       response = "We killed the dom4 process with a pid of "+oldpid;
      }

    cb(null, response);
    });
  }


Game.remoteMethod(
    'validateSettings',
    {
      http: {path: '/validateSettings', verb: 'get'},
      accepts: [
       {arg: 'gamename', type: 'string', http: { source: 'query' }},
       {arg: 'password', type: 'string', http: { source: 'query' }}
      ],
      returns: {arg: 'response', type: 'string'}
    }
    );  

Game.remoteMethod(
    'removeGame',
    {
      http: {path: '/removeGame', verb: 'get'},
      accepts: [
       {arg: 'gamename', type: 'string', http: { source: 'query' }},
       {arg: 'password', type: 'string', http: { source: 'query' }}
      ],
      returns: {arg: 'response', type: 'string'}
    }
    );

Game.remoteMethod(
    'restartGame',
    {
      http: {path: '/restartGame', verb: 'get'},
      accepts: [
       {arg: 'gamename', type: 'string', http: { source: 'query' }},
       {arg: 'password', type: 'string', http: { source: 'query' }}
      ],
      returns: {arg: 'response', type: 'string'}
    }
    );

 Game.remoteMethod(
    'startGame',
    {
      http: {path: '/startGame', verb: 'get'},
      accepts: [
       {arg: 'gamename', type: 'string', http: { source: 'query' }},
       {arg: 'password', type: 'string', http: { source: 'query' }}
      ],
      returns: {arg: 'response', type: 'string'}
    }
    );

 Game.remoteMethod(
    'stopGame',
    {
      http: {path: '/stopGame', verb: 'post'},
      accepts: [
       {arg: 'gamename', type: 'string', http: { source: 'query' }},
       {arg: 'password', type: 'string', http: { source: 'query' }}
      ],
      returns: {arg: 'response', type: 'string'}
    }
    );

 Game.remoteMethod(
    'status',
    {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );


 Game.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'gamename', type: 'string', http: { source: 'query' } },
          returns: {arg: 'gamename', type: 'string'}
        }
    );

 Game.remoteMethod (
        'getId',
        {
          http: {path: '/getid', verb: 'get'},
          accepts: {arg: 'gamename', type: 'string', http: { source: 'query' } },
          returns: {arg: 'gamename', type: 'string'}
        }
    );

};
