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
        var commandline="/home/steam/dom/dom4.sh ";
        cpath="/home/steam/dom";
        //cpath="/Users/will/Library/Application\\ Support/Steam/SteamApps/common/Dominions4/Dominions4.app/Contents/MacOS/";
        //command="Dominions4";
        command="dom4.sh";
        var args=[];
        args.push("-T");
        args.push("--tcpserver");
        args.push("--port "+instance.port);
        args.push("--era "+instance.era);
        args.push("--mapfile " + instance.map);
        args.push("--renaming");
        commandline+="-T --tcpserver --port "+instance.port+" --era "+instance.era+" --mapfile "+instance.map+" --renaming ";
        if(instance.masterPassword!=undefined) { args.push("--masterpass " + instance.masterPassword + " ");}
        if(instance.mods!=undefined ) { 
          var temp = instance.mods;
          temp.split(',').forEach(function(myString) {
            //fix this so if no mods it doesn't do shit
           // args.push("--enablemod " + myString + " ");
          })
        }
        if(instance.noClientStart==true) { args.push("--noclientstart ");}
        if(instance.hours!=undefined) { args.push("--hours " + instance.hours + " ");}
        if(instance.minutes!=undefined) { args.push("--minutes " + instance.minutes + " ");}
        if(instance.thrones!=undefined) { args.push("--thrones " + instance.thrones + " ");}
        if(instance.requiredap!=undefined) { args.push("--requiredap " + instance.requiredap + " ");}
        if(instance.eventRarity!=undefined) { args.push("--eventrarity " + instance.eventRarity + " ");}
        if(instance.magicSites!=undefined) { args.push("--magicsites " + instance.magicSites + " ");}
        if(instance.scoredumpStatus==true) { args.push("--scoredump ");}
        if(instance.statfileStatus!=undefined) { args.push("--statfile ");}
        if(instance.hofSize!=undefined) { args.push("--hofsize " + instance.hofSize + " ");}
        if(instance.teamGame!=undefined) { args.push("--teamgame " + instance.teamGame + " ");}
        if(instance.teams!=undefined) { args.push("--teams " + instance.teams + " ");}
        args.push(instance.id);

        //first try
        if(instance.masterPassword!=undefined) { commandline+="--masterpass " + instance.masterPassword + " ";}
        if((instance.mods!=undefined ) || (instance.mods!="")) { 
          var temp = instance.mods;
          temp.split(',').forEach(function(myString) {
            //fix this so if no mods it doesn't do shit
            // commandline+="--enablemod " + myString + " ";
          })
        }
        if(instance.noClientStart==true) { commandline+="--noclientstart ";}
        if(instance.hours!=undefined) { commandline+="--hours " + instance.hours + " ";}
        if(instance.minutes!=undefined) { commandline+="--minutes " + instance.minutes + " ";}
        if(instance.thrones!=undefined) { commandline+="--thrones " + instance.thrones + " ";}
        if(instance.requiredap!=undefined) { commandline+="--requiredap " + instance.requiredap + " ";}
        if(instance.eventRarity!=undefined) { commandline+="--eventrarity " + instance.eventRarity + " ";}
        if(instance.magicSites!=undefined) { commandline+="--magicsites " + instance.magicSites + " ";}
        if(instance.scoredumpStatus==true) { commandline+="--scoredump ";}
        if(instance.statfileStatus!=undefined) { commandline+="--statfile ";}
        if(instance.hofSize!=undefined) { commandline+="--hofsize " + instance.hofSize + " ";}
        if(instance.teamGame!=undefined) { commandline+="--teamgame " + instance.teamGame + " ";}
        if(instance.teams!=undefined) { commandline+="--teams " + instance.teams + " ";}
        // if(instance.eventRarity!=undefined) { commandline+="--eventRarity " + instance.eventRarity + " ";}
        // if(instance.eventRarity!=undefined) { commandline+="--eventRarity " + instance.eventRarity + " ";}
        // if(instance.eventRarity!=undefined) { commandline+="--eventRarity " + instance.eventRarity + " ";}
        commandline+= instance.id + " &";
//        ps -ef | grep blitz1 | grep dom4_amd64

        //command='rundom.sh';
        //args=[];
        // args.push("-f");
        // args.push("bower.json");
        // args.push("&");
        // var fs = require('fs'),
        //      spawn = require('child_process').spawn,
        //      out = fs.openSync('./out.log', 'a'),
        //      err = fs.openSync('./out.log', 'a');

        // console.log(command,args,process.env.PATH);
        //  var child = spawn(command, args, {
        //    detached: true,
        //    stdio: [ 'ignore', out, err ],
        //    cwd: cpath
        //  })
        //  .on('error', function( err) { throw err});

        //  child.unref();
        var a = cp.exec(commandline, function(err, stdout, stderr){
          console.log(stdout);
        });
        instance.updateAttribute('pid',a.pid, function (err, object) { });
        instance.save({validate:false,throws:false}, function (err, instance) { });
        return a.pid;
 }

 function stopdom4(instance) {
    var pidstr="";
    var cp = require ('child_process');
    var pid = cp.exec('ps | grep '+instance.id, function(err,stdout,stderr){
        console.log(stdout);
        var output=stdout;
        pidstr=output.split(" ",1);
        console.log(pidstr);
        var realpid=pidstr.match('\d+');
        var a = cp.exec('kill -9 '+realpid, function(err, stdout, stderr){
          console.log(realpid + "in kill thing");
          console.log(stdout);
          var output=stdout;

        });
    });

    // var cp = require ('child_process');
    // var pid = cp.exec('ps -ef | grep '+instance.id + ' | grep dom4_amd64', function(err,stdout,stderr){
    //     console.log(stdout);
    //     var output=stdout;
    // });

   
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
       stopdom4(instance);
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
