const express = require('express')
const axios = require('axios')
const Contestant = require('../models/contestant')

const router = express.Router()

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//main index..
router.get('/', async(req,res)=>{
    const response = await axios.get('http://localhost:3000/battle')

    res.render('index',{"war":response.data})
})

router.get('/battle',async(req,res)=>{
    try{
        var least = await Contestant.find({}).sort({'appeared': 1}).limit(1)
        var l_val = (least[0].appeared)
        
        var warriors = await Contestant.find({appeared: l_val})
        
        var len = warriors.length

        while(len == 1){
            console.log('ik vaari hor')
            warriors[0].appeared += 1
            await warriors[0].save()
            var least = await Contestant.find({}).sort({'appeared': 1}).limit(1)
            var l_val = (least[0].appeared)
            
            var warriors = await Contestant.find({appeared: l_val})
            len = warriors.length
        }

        var one = getRandomInt(len)
        var two = getRandomInt(len)

        while(one == two){
            two = getRandomInt(len)
        }

        warriors[one].appeared += 1
        warriors[two].appeared += 1
        await warriors[one].save()
        await warriors[two].save()
        
        var war = []
        war.push(warriors[one])
        war.push(warriors[two])

        res.send(war)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router