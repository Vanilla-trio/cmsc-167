const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

let credentials = []

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/current-login', (req, res) =>{  
	const inputs = req.body
	console.log(inputs)
	credentials.push(inputs)
	res.send("logged in")
})
app.get('/login-data', (req, res) =>{  
	res.json(credentials)
})

app.listen(port, () => console.log(`app listening on port ${port}`))