// dependencies
// const express = require('express')
const baker = express.Router()
// const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

// export
module.exports = baker

baker.get('/data/seed', (req: any, res: any) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})


// Index: 
baker.get('/', (req: any, res: any) => {
    Baker.find()
        .populate('breads')
        .then((foundBakers: any) => {
            res.send(foundBakers)
        })
})

// Show: 
// show 
baker.get('/:id', (req: any, res: any) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 5 }
        })
        .then((foundBaker: any) => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})


// delete
baker.delete('/:id', (req: any, res: any) => {
    Baker.findByIdAndDelete(req.params.id)
        .then((deletedBaker: any) => {
            res.status(303).redirect('/breads')
        })
})
