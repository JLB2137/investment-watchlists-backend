const axios = require('axios')
const express = require('express')
const stockRouter = express.Router()
const routerFunctions = require('./routerFunctions')
const grabDataTest = routerFunctions.grabDataTest
const searchSymbol = routerFunctions.searchSymbol




stockRouter.get('/stock/:symbol', async (req,res)=> {
    try {
        const returnedData = await searchSymbol(req.params.symbol)
        res.json(returnedData)
    }
    catch(err) {
        res.send(err)
    }

})

stockRouter.post('/post', (req,res)=> {
    try{
        res.json(Watchlist.create(req.body))
    } catch(err) {
        res.send(err)
    }

})

stockRouter.delete('/post/:id', async (req,res)=> {
    try{
        res.json(await Watchlist.findByIdAndDelete(req.params.id))
    } catch(err) {
        res.send(err)
    }

})

stockRouter.get('/watchlist/:userID', async (req,res) => {
    try {
        res.json(await Watchlist.find({user: req.params.userID}))
    } catch(err) {
        res.send(err)
    }
})

//renaming watchlist
stockRouter.get('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.find({user: req.params.userID}))
    }
    catch(err) {
        res.send(err)
    }
})

stockRouter.post('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(WatchlistNaming.create(req.body))
    }
    catch(err) {
        res.send(err)
    }
})

stockRouter.put('/watchlistNaming/rename/:watchlistID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.findByIdAndUpdate(req.params.watchlistID, req.body, { new: true }))
    }
    catch(err) {
        res.send(err)
    }
})



stockRouter.get('/', async (req,res)=> {
})

module.exports = stockRouter