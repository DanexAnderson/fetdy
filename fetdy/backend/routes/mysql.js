const express = require('express')
const router = express.Router()
const mysql = require('mysql'); 
//const passport = require('passport')
//const http = require('http').Server(express); // http server


const connect_online = mysql.createConnection({ // Mysql Connection
        host     : 'db4free.net',
        user     : 'truefan',
        password : 'knox2005',
        database : 'truefandb',
    });

    const connect_local = mysql.createConnection({ // Mysql Connection
        host     : 'localhost',
        user     : 'root',
        password : '123456789',
        database : 'truefandb',
    });

    // let connect = connect1;
     let connect = connect_local

router.get('/fans',(req,res) =>{
    let data = {
        "Data":""
    };
    
    connect.query("SELECT * from fans",function(err, rows, fields){
        if (err) throw err;
        //console.log('');

        if(rows.length != 0){
            data["Data"] = rows;
            //res.json(data);
            res.json(rows);
        }else{
            data["Data"] = 'No data Found..';
            res.json(data);
        }
    });
});

module.exports =router