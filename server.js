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


const options = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/auto-complete',
    params: {q: 'tesla', region: 'US'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
};

const options2 = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
    params: {symbols: 'tsla', region: 'US'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
};


const searchSymbol = (symbol) => {
    const apiInfo = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
        params: {symbols: symbol, region: 'US'},
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
    };

    const grabDataFromSymbol = async (symbol,apiGet) => {
        try {
            const response = await axios.request(apiGet)
            const data = await response.data.quoteResponse
            console.log(data)
            return(data)
        } catch (err) {
            console.log(err, () => console.log(err))
        }
    }

    return grabDataFromSymbol(symbol, apiInfo)

}



const grabData = async() => {
    try {
        const response = await axios.request(options2)
        const data = response.data
        return(data)
    } catch (err) {
        console.log(err, () => console.log(err))
    }
}

app.get('/', async (req,res)=> {
    const returnedData = await grabData()
    const testing = returnedData.quoteResponse.result[0]
    res.json(testing)
})

app.get('/stock/:symbol', async (req,res)=> {
    
    const returnedData = await searchSymbol(req.params.symbol)
    res.json(returnedData)
})


app.listen(PORT, () => console.log("connected to PORT 3001"))