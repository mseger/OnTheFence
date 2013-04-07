var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , loginPage = require('./routes/loginPage')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: process.env.FACEBOOK_APPID, secret: process.env.FACEBOOK_SECRET}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost');
});

// GETS
app.get('/', loginPage.splash);
app.get('/login', Facebook.loginRequired(), user.login);

// PUTS
app.post('/login', Facebook.loginRequired(), user.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
