const express=require('express')
const router =express.Router();


router.get('/', (req, res) =>{
    console.log('wanderer')
    res.send('server is running');
})

router.get('/health', (req, res) =>{
    
    try{
        res.status=200;
    }catch(e){
        console.log(e);
        res.status=500;
    }

    res.send('server is running');
})

module.exports=router;