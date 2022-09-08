var express = require('express');  
var app = express();  
var fs = require("fs");  
var bodyParser = require('body-parser');  
/// câu lệnh chạy server : node server.js

//enable CORS for request verbs
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
  next();  
}); 
app.use(bodyParser.urlencoded({  
    extended: true  
}));  
app.use(bodyParser.json());
//#region Product

app.get('/product', function (req, res) {
    var auth = {
        code :200,
        message: "",
    };
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(req.headers.authorization != `Bearer ${data.access_token}`){
            auth.code = 403;
            auth.message = "Token is invalid.";
        }
        else{
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes());
            var now = d1.toUTCString();
            if(Date.parse(data.expires) < Date.parse(now)){
                auth.code = 403;
                auth.message = "Token has expired.";
            }
        }
        if(auth.code != 200){
            res.status(auth.code).json({error: auth.message});
        }
        else{
            fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {   
                res.end(JSON.stringify(JSON.parse(data),null,2));  
            });
        }
    });      
});

app.post('/product', function (req, res) {
    var auth = {
        code :200,
        message: "",
    };
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(req.headers.authorization != `Bearer ${data.access_token}`){
            auth.code = 403;
            auth.message = "Token is invalid.";
        }
        else{
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes());
            var now = d1.toUTCString();
            if(Date.parse(data.expires) < Date.parse(now)){
                auth.code = 403;
                auth.message = "Token has expired.";
            }
        }
        if(auth.code != 200){
            res.status(auth.code).json({error: auth.message});
        }
        else{
            fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
                data = JSON.parse(data);
                var max = 0;
                if(data.length >0){
                    var maxObject = data.reduce(function(prev, current) {
                        return (prev.Id > current.Id) ? prev : current
                    });
                    max = maxObject.Id;
                }
                var newproduct = {Id:max+1,...req.body};
                data.push(newproduct);
                fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
                    if (err) return console.log(err);
                    console.log('Create product success.');
                });
                res.end(JSON.stringify(data));  
            });
        }
    });    
})  

app.get('/product/:id', function (req, res) {
    var auth = {
        code :200,
        message: "",
    };
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(req.headers.authorization != `Bearer ${data.access_token}`){
            auth.code = 403;
            auth.message = "Token is invalid.";
        }
        else{
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes());
            var now = d1.toUTCString();
            if(Date.parse(data.expires) < Date.parse(now)){
                auth.code = 403;
                auth.message = "Token has expired.";
            }
        }
        if(auth.code != 200){
            res.status(auth.code).json({error: auth.message});
        }
        else{
            fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {
                data = JSON.parse(data);
                var item = data.find(x => x.Id.toString() === req.params.id);  
                res.end(JSON.stringify(item));  
            }); 
        }
    });
});

app.put('/product/:id', function(req,res){
    var auth = {
        code :200,
        message: "",
    };
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(req.headers.authorization != `Bearer ${data.access_token}`){
            auth.code = 403;
            auth.message = "Token is invalid.";
        }
        else{
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes());
            var now = d1.toUTCString();
            if(Date.parse(data.expires) < Date.parse(now)){
                auth.code = 403;
                auth.message = "Token has expired.";
            }
        }
        if(auth.code != 200){
            res.status(auth.code).json({error: auth.message});
        }
        else{
            fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
                data = JSON.parse(data);
                var index = data.findIndex(function(i){
                    return i.Id.toString() === req.params.id;
                });
                data[index] = {...data[index],...req.body}
                fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
                    if (err) return console.log(err);
                    console.log('Update product success.');
                });
                res.end(JSON.stringify(data));  
            });
        }
    });  
});

app.delete('/product/:id', function (req, res) {
    var auth = {
        code :200,
        message: "",
    };
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(req.headers.authorization != `Bearer ${data.access_token}`){
            auth.code = 403;
            auth.message = "Token is invalid.";
        }
        else{
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes());
            var now = d1.toUTCString();
            if(Date.parse(data.expires) < Date.parse(now)){
                auth.code = 403;
                auth.message = "Token has expired.";
            }
        }
        if(auth.code != 200){
            res.status(auth.code).json({error: auth.message});
        }
        else{
            fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
                data = JSON.parse(data);
                var index = data.findIndex(function(i){
                    return i.Id.toString() === req.params.id;
                });
                if(index >-1)
                    data.splice(index, 1);
                fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
                    if (err) return console.log(err);
                  }); 
                res.end(JSON.stringify(data));  
            });
        }
    });
})  

app.get('/customer', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {   
        res.end(JSON.stringify(JSON.parse(data),null,2));  
    });  
});
app.post('/customer', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var max = 0;
        if(data.length >0){
            var maxObject = data.reduce(function(prev, current) {
                return (prev.Id > current.Id) ? prev : current
            });
            max = maxObject.Id;
        }
        var newproduct = {Id:max+1,...req.body};
        data.push(newproduct);
        fs.writeFile(`${__dirname}/data/customer.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Create customer success.');
        }); 
        res.end(JSON.stringify(data));  
    });  
})  

app.get('/customer/:id', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {
        data = JSON.parse(data);
        var item = data.find(x => x.Id.toString() === req.params.id);  
        res.end(JSON.stringify(item));  
    }); 
});

app.put('/customer/:id', function(req,res){
    // First read existing users.  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var index = data.findIndex(function(i){
            return i.Id.toString() === req.params.id;
        });
        data[index] = {...data[index],...req.body}
        fs.writeFile(`${__dirname}/data/customer.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Update customer success.');
        }); 
        res.end(JSON.stringify(data));  
    });  
});

app.delete('/customer/:id', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var index = data.findIndex(function(i){
            return i.Id.toString() === req.params.id;
        });
        if(index >-1)
            data.splice(index, 1);
        fs.writeFile(`${__dirname}/data/customer.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Delete customer success.');
          }); 
        res.end(JSON.stringify(data));  
    });  
})  
//#endregion

//#region customer

//#endregion

function checkAccessToken(token){
    var result = {
        code :200,
        message: "",
    }
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        if(token != data.access_token){
            result.code = 403;
            result.message = "Token is invalid.";
            return result
        }
        var d1 = new Date (),
        d2 = new Date ( d1 );
        d2.setMinutes ( d1.getMinutes());
        var now = d1.toUTCString();
        if(Date.parse(data.expires) < Date.parse(now)){
            result.code = 403;
            result.message = "Token has expired.";
        }  
    })
    return result;
}

function rand () {
    return Math.random().toString(36).substr(2); // remove `0.`
};
function generateToken(){
    var token = function() {
        var token=""
        for (let index = 0; index < 10; index++) {
            token +=rand()
        }
        return token;
    };
    return token();
}
function generateRefreshToken(){
    var token = function() {
        return rand();
    };
    return token();
}

app.post('/auth', function (req, res) {  
    fs.readFile( `${__dirname}/data/token.json`, 'utf8', function (err, data) {
        if(req.body.userName != "admin" || req.body.passWord !="123456"){
            res.status(401).json('Thông tin đăng nhập không chính xác.');
            res.end("");  
        }
        else{
            data = JSON.parse(data);
            if(req.body.refresh_token){
                data.refresh_token = generateRefreshToken();
            }
            var d1 = new Date (),
            d2 = new Date ( d1 );
            d2.setMinutes ( d1.getMinutes() + 30 );
            data.expires = d2.toUTCString();
            data.access_token = generateToken(); 
            fs.writeFile(`${__dirname}/data/token.json`, JSON.stringify(data), function (err) {
                if (err) return console.log(err);
                console.log('Create token success.');
            }); 
            res.end(JSON.stringify(data));  
        }
    });  
})


var server = app.listen(8081, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("My app listening at http://localhost:%s", host, port)  
})  