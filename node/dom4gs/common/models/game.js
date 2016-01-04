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
        commandline+="-T --tcpserver --port "+instance.port+" --era "+instance.era+" --mapfile "+instance.map+" --renaming ";

        //first try
        if(instance.masterPassword!=undefined) { commandline+="--masterpass " + instance.masterPassword + " ";}
        if((instance.mods!=undefined ) && (instance.mods!="")) { 
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
        if(instance.teamGame==true) { commandline+="--teamgame ";}
        if(instance.teams!=undefined) { commandline+="--teams " + instance.teams + " ";}

        commandline+="--preexec '/home/steam/dom4gameserver/scripts/preexecaut.sh /home/steam/dominions4/savedgames/"+instance.id+" "+instance.id+"' ";
        commandline+="--postexec '/home/steam/dom4gameserver/scripts/postexecaut.sh /home/steam/dominions4/savedgames/"+instance.id+"' ";
        commandline+= instance.id + " &";         var a = cp.exec(commandline,
        function(err, stdout, stderr){           console.log(stdout);         });
        instance.updateAttribute('pid',a.pid, function (err, object) { });
        instance.save({validate:false,throws:false}, function (err, instance) { });
        return a.pid;  }

 function stopdom4(instance) {
    console.log("in stopdom4");
    var pidstr;
    var cp = require ('child_process');
    var line='ps e | grep dom4_amd64 | grep '+instance.port+' | grep '+instance.id;
    console.log(line);
    var pid = cp.exec(line, function(err,stdout,stderr){
        console.log(stdout);
        var output=stdout;
	output=output.slice(1);
        var pidarray=output.split(" ",2);
        pidstr=pidarray[1];
	console.log("output=-"+output+"- pidstr="+pidstr);
	if(pidstr!=undefined && pidstr!='' ){
	  console.log("pidstr:"+pidstr);
          console.log(pidstr);
          var a = cp.exec('kill -9 '+pidstr, function(err, stdout, stderr){
            console.log(pidstr + "in kill thing");
            console.log(stdout);
            var output=stdout;
          });
	}
        else{
          console.log("blank pid");
        }
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
