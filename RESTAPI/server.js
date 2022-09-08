var express = require('express');  
var app = express();  
var fs = require("fs");  
var bodyParser = require('body-parser');  
/* var formidable = require('formidable'); */
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
    fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {   
        res.end(JSON.stringify(JSON.parse(data),null,2));  
    });  
});

app.post('/product', function (req, res) {  
    fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var max = 0;
        if(data.length >0){
            var maxObject = data.reduce(function(prev, current) {
                return (prev.id > current.id) ? prev : current
            });
            max = maxObject.id;
        }
        var newproduct = {...req.body,id:Number.parseInt(max)+1};
        data.push(newproduct);
        fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Create product success.');
        });
        res.end(JSON.stringify(data));  
    });
})  

app.post('/order', function (req, res) {  
    fs.readFile( `${__dirname}/data/order.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var max = 0;
        if(data.length >0){
            var maxObject = data.reduce(function(prev, current) {
                return (prev.id > current.id) ? prev : current
            });
            max = maxObject.id;
        }
        var neworder = {...req.body,id:Number.parseInt(max)+1};
        data.push(neworder);
        fs.writeFile(`${__dirname}/data/order.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Create order success.');
        });
        res.end(JSON.stringify(data));  
    });  
}) 

app.get('/product/:id', function (req, res) {  
    fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {
        data = JSON.parse(data);
        var item = data.find(x => x.id.toString() === req.params.id);  
        res.end(JSON.stringify(item));  
    }); 
});

app.put('/product/:id', function(req,res){
    // First read existing users.  
    fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var index = data.findIndex(function(i){
            return i.id.toString() === req.params.id;
        });
        data[index] = {...data[index],...req.body}
        fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Update product success.');
        });
        res.end(JSON.stringify(data));  
    });  
});

app.delete('/product/:id', function (req, res) {  
    fs.readFile( `${__dirname}/data/product.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var index = data.findIndex(function(i){
            return i.id.toString() === req.params.id;
        });
        if(index >-1)
            data.splice(index, 1);
        fs.writeFile(`${__dirname}/data/product.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Delete product success.');
          }); 
        res.end(JSON.stringify(data));  
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
                return (prev.id > current.id) ? prev : current
            });
            max = maxObject.id;
        }
        var newproduct = {id:max+1,...req.body};
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
        var item = data.find(x => x.id.toString() === req.params.id);  
        res.end(JSON.stringify(item));  
    }); 
});

app.put('/customer/:id', function(req,res){
    // First read existing users.  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var index = data.findIndex(function(i){
            return i.id.toString() === req.params.id;
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
            return i.id.toString() === req.params.id;
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

//#region 
app.get('/customer', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {   
        res.end(JSON.stringify(JSON.parse(data),null,2));  
    });  
});

app.post('/customer', function (req, res) {  
    fs.readFile( `${__dirname}/data/customer.json`, 'utf8', function (err, data) {  
        data = JSON.parse(data);
        var max = 0;
        var max = data.length === 0 ? 0 : data.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev.id : current.id
        });
        var newproduct = {id:max+1,...req.body};
        data.push(newproduct);
        fs.writeFile(`${__dirname}/data/customer.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Create product success.');
        }); 
        res.end(JSON.stringify(data));  
    });  
})  
//#endregion

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
        data = JSON.parse(data);
        if(req.body.refresh_token){
            data.refresh_token = generateRefreshToken();
        }
        var d1 = new Date (),
        d2 = new Date ( d1 );
        d2.setMinutes ( d1.getMinutes() + 30 );
        data.exprise = d1.toUTCString();
        data.access_token = generateToken(); 
        fs.writeFile(`${__dirname}/data/token.json`, JSON.stringify(data), function (err) {
            if (err) return console.log(err);
            console.log('Create token success.');
        }); 
        res.end(JSON.stringify(data));  
    });  
})


var server = app.listen(8081, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("My app listening at http://localhost:%s", host, port)  
})  