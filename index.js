const express = require("express")
const cors = require("cors")
const mysql = require('mysql')
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventory'
})

con.connect((err) => {
	if(err){
		console.log(err)
	}
	else
	{
		console.log("connect to MySql DB")
	}

})
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use(cors())

//create
app.post('/create', (req, res) => {
	const sqlCreate = 'INSERT INTO items VALUES (?)'
	const values = [
		req.body.id,req.body.name,req.body.qty,req.body.amount
	]
	   con.query(sqlCreate, [values], (err, res) => {
	      	if (err) throw err;  
			console.log("Record Inserted");  
	   });
})
app.get('/run', (req, res) => {
	const sqlRun = "SELECT * FROM items"
	con.query(sqlRun, (err , res) => {
		console.log(res)
	})
})
app.put('/update', (req, res) => {
	const sqlUpdate = "UPDATE items SET ? WHERE id = ?";
	const values = {
		"name": req.body.name,
		"qty": req.body.qty,
		"amount": req.body.amount
	}

	
	 con.query(sqlUpdate, [values, req.body.id], (err, res) => {
	   if (err) throw err;
	   console.log(res.affectedRows + " record(s) updated");
	 });
})

app.delete('/delete', (req, res) => {
	const sqlDelete = "DELETE FROM items WHERE id = ?";
	  con.query(sqlDelete, req.body.id, (err, result) => {
	    if (err) throw err;
	    console.log("Number of records deleted: " + result.affectedRows);
	  });
})

app.listen(port, () => console.log(`Listening to port ${port}`))
