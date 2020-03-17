const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080

let credentials = []

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/*app.get('http://localhost:8080/', (req, res) =>{
	res.sendFile('C:/Users/Mama Inday/Files/2 academic/Web/work-folder/centoga/components/index.html')
})*/
app.post('/login', (req, res) =>{  
	const inputs = req.body
	console.log(inputs)
	credentials.push(inputs)
	res.send("logged in")
})
app.get('/api/users', (req, res) =>{   
	res.json(credentials)
})

app.listen(port, () => console.log(`Server started! At http://localhost:${port}`))
