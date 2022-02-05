const express=require('express')
const router =express.Router();


router.get('/', (req, res) =>{
    console.log('wanderer')
    res.send('server is running');
})

module.exports=router;