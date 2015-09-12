module.exports = function(Game) {

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
        response = "Name of coffee shop is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }
  Game.getName = function(gamename, cb) {
    Game.find({ where: {name:'a'}, limit: 1 }, function (err, models) {
    	instance = models[0].toJSON();
        response = "Name of coffee shop is " + instance.name;

        cb(null, response);
        console.log(response);
    });
  }

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
