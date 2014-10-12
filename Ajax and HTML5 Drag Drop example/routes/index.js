var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.post('/register',function(req,res){
    var nano = require('nano')('http://localhost:5984');
    var db_name = "registration";
    var dbase = nano.use(db_name);
    var status;
    console.log(req.body)

        dbase.insert(req.body,
            function (error,http_body,http_headers) {
                if(error) {
                    if(error.message === 'no_db_file'  && tried < 1) {
                        // create database and retry
                        return nano.db.create(db_name, function () {
                            dbase.insert(req.body);
                        });
                    }
                    else { return console.log(error);
                    res.send(error.body)
                        status = 500;
                    }
                }
                console.log(http_body);
            });
    if(status==500)
    {
        res.status(500)
    }
    else
    {
        res.status(200)
    }
    res.end();
    /*
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'kRH4L7hy',
        database: 'registration'
    });
    var status;

    connection.connect();
    var inserttablequery = "INSERT INTO registration(FirstName,LastName,email,password, url,dob,doblocal,dobtime,phone,ssn,cc) VALUES ('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.email + "','" + req.body.pwd + "','" + req.body.url + "','" + req.body.dob + "','" + req.body.localdob + "','" + req.body.dobtime + "','" + req.body.phone + "','" + req.body.ssn + "','" + req.body.ccnumber + "')";
    connection.query(inserttablequery, function(error, rows, fields) {
        if (error) { return console.log(error);
            res.send(error.body)
            status = 500;
        }
    });
    if(status==500)
    {
        res.status(500)
    }
    else
    {
        res.status(200)
    }
    res.end();
    */
});


module.exports = router;
