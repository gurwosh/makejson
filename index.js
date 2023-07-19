const express = require('express')

var http = require('http');
var mongoose = require('mongoose');
var connect = require('./db.js'); 
var serveStatic = require('serve-static');      //특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 열어주는 역할
var path = require('path');
var bodyParser_post = require('body-parser');      


//express를 설치했기 때문에 가져올 수 있다.
var database =  connect();   
var app = express();      //express 서버 객체
 
app.use(bodyParser_post.urlencoded({ extended: false }));           
app.use(bodyParser_post.json());  

app.set('view engine','ejs');

app.set('port', 4000);
app.use(serveStatic(path.join('public', __dirname, 'public')));


app.get('/', function(req, res) {
  res.render('main')
})



app.post('/submit', function(req, res) {
    var id = req.body.id
    var name = req.body.name
    var instance =[{'input': req.body.input ,'output': req.body.output}]
    var instruction = req.body.instruction
    
    var data = new boardModel({ "id": id, "name": name, "instruction": instruction, 'instance':instance, "is_classification ": false});

    data.save()

    res.render('two')
    
})

app.listen(5000)