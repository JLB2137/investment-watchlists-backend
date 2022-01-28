require('dotenv').config()
const {API_KEY} = process.env
//A function needed to limit API requests per second
const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//Test symbol grab data function from API
const grabDataTest = async() => {
    try {
        const response = await axios.request(testSymbolTSLA)
        const data = response.data
        return(data)
    } catch (err) {
        console.log(err, () => console.log(err))
    }
}

//Grab data based on request
const grabDataFromSymbol = async (apiGet) => {
    try {
        const response = await axios.request(apiGet)
        const data = await response.data.quoteResponse
        return(await data)
    } catch (err) {
        //API only allows for 5 requests per second...delay this if you have
        //over 5 products being loaded automatically by catching the error and
        //retrying the function
        sleep(750)
        const response = await axios.request(apiGet)
        const data = await response.data.quoteResponse
        //console.log(data)
        return(await data)
    }
}

//function to update the API search dynamically and 
const searchSymbol = async (symbol) => {
    const apiInfo = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
        params: {symbols: symbol, region: 'US'},
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
    };

    //Run Grab data using the symbol API data provided
    return await grabDataFromSymbol(apiInfo)

}

module.exports = {
    grabDataTest,
    searchSymbol
}