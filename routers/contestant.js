const express = require('express')
const Contestant = require('../models/contestant')

const router = express.Router()

//add new con
router.post('/addcon',async(req,res)=>{
    const con = new Contestant(req.body)

    try{
        await con.save()
        res.status(201).send(con)
    }catch(e){
        res.status(400).send(e)
    }
})

//on click, update rating
router.patch('/winner/:id', async(req,res)=>{
    const _id = req.params.id
    const winner = await Contestant.findByIdAndUpdate({_id},{$inc:{rating : 1}})
    res.send(winner)
})

module.exports = router