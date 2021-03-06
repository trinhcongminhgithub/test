var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var path = require('path');
var client =redis.createClient({
    host: 'redishost',
    port:6379
});
var connection = mysql.createConnection({
    host: 'db',
    user: 'minh',
    password: 'minh',
    database: 'mydatabase',
});

var app = express();

app.use(session({
    secret: 'secret',
    store: new redisStore({host:'redishost', port:6379,client:client,ttl:5000}),
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(request, response){
    console.log(request);
    response.sendFile(path.join(__dirname+'/login.html'));
});
app.get('/reg_site', function(request,response){
    response.sendFile(path.join(__dirname+'/regis.html'));
});
app.post('/reg',function(request,response){
    username=request.body.username;
    email=request.body.email;
    pass1=request.body.password;
    pass2=request.body.passwordconf;
    if(pass1==pass2){
        connection.query('SELECT * FROM accounts WHERE username = ?',[username],function(error,results,fields){
            if(error){
                response.send(error);
		response.end();
            }
            else{
                if(results.length > 0){
                    response.send("Username already existed");
		    response.end();
                }
                else{
                    connection.query('INSERT INTO accounts (username,password,email) VALUES (?,?,?)',[username,pass1,email],function(error,results,fields){
                        if(error){
			    response.send(error);
			}
			else{
                            request.session.loggedin=true;
			    request.session.username=username;
			    response.redirect('/home');
                        }
			response.end();
                    });
		}
            }
        });
    }
    else{
        response.send('Password and Confirm Password do not match');
    	response.end();
	}
});

app.post('/auth', function(request,response){
    var username = request.body.username;
    var password = request.body.password;
    if (username && password){
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?',[username,password],function(error,result,fields){
        if(error){
            response.send(error);
        }
        else {if(result.length > 0){
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
        }else{
            response.send('Incorrect Username and/or Password!');
        }}
        response.end();
    });
} else{
    response.send('Please enter Username and Password!');
    response.end();
}
});


app.get('/home', function(request,response){
    if(request.session.loggedin){
        response.send('Welcome back, ' +request.session.username+'!');
    }else{
        response.send('Please login to view this page!');
    }
    response.end();
});
app.listen(3000);

