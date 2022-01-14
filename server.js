const axios = require('axios')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const {PORT,API_KEY} = process.env

//middleWare
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


var options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/auto-complete',
    params: {q: 'tesla', region: 'US'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
};

const grabData = async() => {
    try {
        const response = await axios.request(options)
        console.log(response.data)
    } catch (err) {
        console.log(err, () => console.log(err))
    }

}

app.get('/', (req,res)=> {
    grabData()
    res.send('Hello World')
})


app.listen(PORT, () => console.log("connected to PORT 3001"))