const mongoose = require('mongoose')
const validator = require('validator')
const schema = mongoose.Schema

const contestantschema = new schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    rating:{
        type: Number,
        default: 0
    },
    appeared:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const Contestant = mongoose.model('Contestant', contestantschema)

module.exports = Contestant