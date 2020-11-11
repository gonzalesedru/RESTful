const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.use(cors())

//create
app.post('/post', (req, res) => {
	console.log("post")
})
app.get('/get', (req, res) => {
	console.log("get")
})
app.put('/update', (req, res) => {
	console.log("update")
})

app.delete('/delete', (req, res) => {
	console.log("delete")
})

app.listen(port, () => console.log(`Listening to port ${port}`))
