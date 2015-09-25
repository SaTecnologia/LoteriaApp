var     express         = require('express')
    ,   path            = require('path')
    ,   favicon         = require('serve-favicon')
    ,   logger          = require('morgan')
    ,   cookieParser    = require('cookie-parser')
    ,   bodyParser      = require('body-parser')
    ,   mongoose        = require('mongoose')
    ,   cors            = require('cors')
    ,   expressSession  = require('express-session')
    ,   passport        = require('passport')
    ,   passportLocal   = require('passport-local')
    ,   passportHttp    = require('passport-http')
    ,   load            = require('express-load')
    ,   app             = express()
    ,   http            = require('http').Server(app)
    ,   io              = require('socket.io')(http);

//mongoose.connect('mongodb://localhost/loteria', function(err){
 mongoose.connect('mongodb://betplay:betplay@ds051953.mongolab.com:51953/betplay', function(err){
    if( err ) {
        console.log("Error conectar mongo db: " + err);
    } else {
        console.log("Conexao realizada com sucesso!");
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Conexao realizada!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('iY}ONxQ,Y9I^Z}&y6-i}~35cS/vk/sf8+y@8c.2></>P*Z03Xhue?lzY%|dzN>S'));
app.use(expressSession({
                            secret: process.env.SESSION_SECRET || '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85',
                            saveUninitialized: false,
                            resave: false
                        }
                    )
        );

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
},verificaLogin));

passport.use(new passportHttp.BasicStrategy(verificaLogin));

function verificaLogin(username, password, done){
    var pass = require('./middleware/password');
    var User = app.models.user;
    User.findOne({ 'email': username }, function (err, result) {
        if(err) { console.log("ERROR: " + err); }
        else {
            if(result){
                if(result.email == username && pass.validate(result.password, password)) {
                    done(null, result);
                } else {
                    done(null, null);
                }
            } else {
                done(null, null);
            }
        }
    });
}

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({error: {
            message: err.message,
            error: err
        }});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: {
        message: err.message,
        error: {}
    }});
});


app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

var users = 0;
io.on('connection', function(socket){
    users++;

    socket.on('disconnect', function(){
        users--;
        conexoes();
    });


    conexoes();
  

  function conexoes(){
    console.log(users);
    io.sockets.emit('usuariosConectados', users);
  }
});

//module.exports = app;