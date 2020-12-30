const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('common'))

const store = require('./playstore.js')

app.get('/app', (req, res) => {
    let list = store
    const { sort, genres } = req.query
    
    if (sort == '' || sort && !['rating','app'].includes(sort)) {
        return res.status(400).send('Sort must be defined as one of rating or app')
    }
    if ('rating'.includes(sort)) {
        list.sort((a, b) => {
            if (a.Rating < b.Rating) {
                return -1
            } else if (b.Rating < a.Rating) {
                return 1
            } else return 0
        })
    }
    if ('app'.includes(sort)) {
        list.sort((a, b) => {
            if (a.App < b.App) {
                return -1
            } else if (b.App < a.App) {
                return 1
            } else return 0
        })
    }

    if (genres == '' 
    || genres && !['Action','Puzzle','Casual','Arcade','Card'].includes(genres)) {
        return res.status(400).send('Genre must be defined as one of Action, Puzzle, Casual, Arcade, or Card')
    }
    if (['Action','Puzzle','Casual','Arcade','Card'].includes(genres)) {
        console.log(genres)
        list = list.filter(app => app.Genres.includes(genres))
    }

    return res.json(list)
})

module.exports = app