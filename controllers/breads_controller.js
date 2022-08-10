const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const breadSeedData = require('../models/seed.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', async (req, res) => {
    const foundBakers = await Baker.find().lean()
    const foundBreads = await Bread.find().limit(5).lean()
    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
    })
})



// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundBread => {
                    res.render('edit', {
                        bread: foundBread,
                        bakers: foundBakers
                    })
                })
        })
})

// SHOW
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.send('404')
        })
})



// breads.get('/:arrayIndex', (req, res) => {
//     if (Bread[req.params.arrayIndex]) {
//         res.render('Show', {
//             bread: Bread[req.params.arrayIndex],
//             index: req.params.arrayIndex,
//         })
//     } else {
//         res.render('404')
//     }
// })


// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

// breads.post('/', (req, res) => {
//     if (!req.body.image) {
//         req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//     }
//     if (req.body.hasGluten === 'on') {
//         req.body.hasGluten = true
//     } else {
//         req.body.hasGluten = false
//     }
//     Bread.push(req.body)
//     res.redirect('/breads')
// })

// DELETE
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })
})

// UPDATE
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
})

// Seed
breads.get('/data/seed', (req, res) => {
    Bread.insertMany(breadSeedData)
        .then(createdBreads => {
            res.redirect('/breads')
        })
})
module.exports = breads