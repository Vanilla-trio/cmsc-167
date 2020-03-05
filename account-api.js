const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express(); 
const port = 3000;
//app.set('port', process.env.PORT || 8080);
//where we keep the accounts
let accounts = [];

app.use(cors());

//middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.post('/accounts', (req, res) => {
  const account = req.body;
  console.log(account);
  accounts.push(account);
  res.send('account is recorded');
})

app.get('/accounts', (req, res) => {
	res.json(accounts);
})
//app.listen(app.get('port'));
app.listen(port, () => console.log(`app listening on port ${port}!`));

