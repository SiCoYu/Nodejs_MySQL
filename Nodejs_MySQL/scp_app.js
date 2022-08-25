var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');//解析,用req.body获取post参数

//连接数据库
var connection = mysql.createConnection({
  host: 'localhost',//主机
  user: 'root',//mysql认证的用户名
  password: '123456',//mysql用户密码
  database: 'test',//数据库名
  port: '3306'//端口号
});
 
connection.connect();

var questions = [
  {
    data: 213,
    num: 444,
    age: 12
  }
];

//列表
app.get('/list', function (req, res) {
  var sql = 'SELECT * FROM websites';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    res.json(result)
  });
});
 
//新增插入
app.get('/list_add', function (req, res) {
	var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
	var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
	connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
	});
});
 
//修改
app.get('/list_edit', function (req, res) {
	var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
	var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',7];
	connection.query(modSql,modSqlParams,function (err, result) {
		if(err){
			console.log('[UPDATE ERROR] - ',err.message);
			return;
		}        
		console.log('--------------------------UPDATE----------------------------');
		console.log('UPDATE affectedRows',result.affectedRows);
		console.log('-----------------------------------------------------------------\n\n');
	});
});
 
//删除
app.get('/list_del', function (req, res) {
	var delSql = 'DELETE FROM websites where id=6';
	connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log('DELETE affectedRows',result.affectedRows);
       console.log('-----------------------------------------------------------------\n\n');  
	});
})
 
//登录接口
app.get('/user', function (req, res) {
  res.status(200),
    res.json(questions)
});
 
 //  POST 请求
app.post('/post', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//post接口 获取参数req.body
app.post('/demo', function (req, res) {
  // console.log("主页 POST 请求");
  var delSql = "DELETE FROM websites WHERE Id = ?"
  var delid = [req.body.id];
  // console.log(req.body.id)
  connection.query(delSql, delid, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    res.json(result)
  });
})

//配置服务端口
var server = app.listen(3000, function () {
 
  var host = server.address().address;
 
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);
})