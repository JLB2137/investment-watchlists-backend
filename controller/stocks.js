const axios = require('axios')
const express = require('express')
const stockRouter = express.Router()
const searchSymbol = require('./routerFunctions')
const Watchlist = require('../models/UserWatchlist')
const WatchlistNaming = require('../models/WatchlistNaming')



//get stock information
stockRouter.get('/stock/:symbol', async (req,res)=> {
    try {
        const returnedData = await searchSymbol(req.params.symbol)
        res.json(returnedData)
    }
    catch(err) {
        res.send(err)
    }

})

//add stock to watchlist in DB
stockRouter.post('/post', (req,res)=> {
    try{
        res.json(Watchlist.create(req.body))
    } catch(err) {
        res.send(err)
    }

})

//delete stock from watchlist in DB
stockRouter.delete('/post/:id', async (req,res)=> {
    try{
        res.json(await Watchlist.findByIdAndDelete(req.params.id))
    } catch(err) {
        res.send(err)
    }

})

//get watchlist from DB based on user
stockRouter.get('/watchlist/:userID', async (req,res) => {
    try {
        res.json(await Watchlist.find({user: req.params.userID}))
    } catch(err) {
        res.send(err)
    }
})

//get user settings information
stockRouter.get('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.find({user: req.params.userID}))
    }
    catch(err) {
        res.send(err)
    }
})

//post user settings information
stockRouter.post('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(WatchlistNaming.create(req.body))
    }
    catch(err) {
        res.send(err)
    }
})

//update user settings information
stockRouter.put('/watchlistNaming/rename/:watchlistID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.findByIdAndUpdate(req.params.watchlistID, req.body, { new: true }))
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = stockRouter