const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PROUDCTS_QUERY = 'SELECT * FROM employees';
const SELECT_ALL_SALERIES_QUERY = 'SELECT * FROM salaries';


const connection = mysql.createConnection({
    host: 'mysqlcmpe172.cesvqb7qkvn2.us-east-1.rds.amazonaws.com',
    user: 'cmpe172username',
    password: 'cmpe172password',
    database: 'cmpe172database'
});

connection.connect(err => {
    if(err){
    return err;
    }
});

 //console.log(connection);
app.use(cors());



app.get('/',(req, res) =>  {
    res.send('go to /employees to see employees')
});

app.get('/salaries/search', (req, res) => {
    const{emp_no} = req.query
    const SEARCH_SALERIES_QUERY = `SELECT * FROM salaries WHERE emp_no ='${emp_no}'`;
   

    connection.query(SEARCH_SALERIES_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
            data: results
            })
        }
    });
    });

    app.get('/salaries/add', (req, res) => {
        const{emp_no, salary} = req.query
        const INSERT_SALARIES_QUERY = `INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES ('${emp_no}','${salary}', now(), '9999-00,00')`;
       
    
        connection.query(INSERT_SALARIES_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            }
            else{
                 return res.send('successfully added salaries to database')
            }
        });
        //console.log(name, price);
        //res.send('adding products');
    });


    app.get('/salaries/delete', (req, res) => {
        const{emp_no, from_date} = req.query
        const DELETE_SALARIES_QUERY = `DELETE FROM salaries WHERE emp_no = '${emp_no}' AND from_date = '${from_date}'`;
       
    
        connection.query(DELETE_SALARIES_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            }
            else{
                 return res.send('successfully deleted salaries from database')
            }
        });
        //console.log(name, price);
        //res.send('adding products');
    });

    app.get('/employees/search', (req, res) => {
        const{emp_no} = req.query
        const SEARCH_EMPLOYEE_QUERY = `SELECT * FROM employees WHERE emp_no ='${emp_no}'`;
       
    
        connection.query(SEARCH_EMPLOYEE_QUERY, (err, results) => {
            if(err) {
                return res.send(err)
            }
            else {
                return res.json({
                data: results
                })
            }
        });
        });

       

app.get('/employees/add', (req, res) => {
    const{name, price} = req.query
    const INSERT_PRODUCTS_QUERY = `INSERT INTO employees (name, price) VALUES ('${name}','${price}')`;
   

    connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
             return res.send('successfully added product')
        }
    });
    //console.log(name, price);
    //res.send('adding products');
});

app.get('/employees',(req, res) =>  {
    connection.query(SELECT_ALL_PROUDCTS_QUERY, (err, results) => {
    if(err){
    return res.send(err)
    }
    else {
        return res.json({
        data: results
        })
    }
});
});

app.get('/salaries',(req, res) =>  {
    connection.query(SELECT_ALL_SALERIES_QUERY, (err, results) => {
    if(err){
    return res.send(err)
    }
    else {
        return res.json({
        data: results
        })
    }
});
});

app.listen(4000, () =>  {
    console.log('employees server listening on port 4000')

});