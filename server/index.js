const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyparser = require('body-parser');  

app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Akash28@da',
    database: 'tester',
})
db.connect((err) => {
    if (err) {
        console.error('connection failed');
    }
    else {
        console.log('db connected');
    }
})

app.get('/data', (req, res) => {
    const testQuery = 'select * from experiment';
    db.query(testQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    })
})

app.put('/edit/:id',(req,res)=>{
    const {id} = req.params;
    const {name}= req.body;
    const q = 'update experiment set name=? where id=?';
    db.query(q,[name,id],(err,result)=>{
        if(err)
        {
            return res.status(500).json({error:err.message})
        }
        res.status(200).json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const testquery='delete from experiment where id=?';
    db.query(testquery,[id],(err,result)=>{
        if(err)
        {
            return res.status(500).json({error:err.message})
        }
        res.status(200).json(result);
    })
})

app.post('/addData',(req,res)=>{
    const {name,id,age} = req.body;
    const q = 'insert into experiment values(?,?,?)';
    db.query(q,[name,id,age],(err,result)=>{
        if(err)
        {
            return res.status(500).json({error:err.message});
        }
        res.status(201).json(result);
    })
})

app.get('/data/:id', (req, res) => {
    const { id } = req.params;
    const q = 'select * from experiment where id=?';
    db.query(q, [id], (err, resu) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json(resu);
    })
})


app.listen(3000, () => {
    console.log('sever running');
});