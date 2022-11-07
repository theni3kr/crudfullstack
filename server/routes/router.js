const express = require("express")
const users = require("../models/userSchema")
const router = express.Router()


//register user

router.post('/register',async(req,res)=>{
    // console.log(req.body)
    const {name,email,age,mobile,work,add,desc} = req.body

    if(!name||!email||!age||!mobile||!work||!add||!desc){
        res.status(422).json("plz fill the data");
        return
    }

    try{
        const preuser = await users.findOne({email:email})
        console.log(preuser)


        if(preuser){
            res.status(422).json("this user is already exist")
            return
        }else{
           const adduser = new users({
            name,email,age,mobile,work,add,desc
            })
            await adduser.save()
            res.status(201).json(adduser)
            console.log(adduser)
            
        }
    }catch(err){
        res.status(422).json(err)
    }
    
})


//get all user data

router.get("/userdata", async(req,res)=>{
    try{
        const getuser = await users.find()
        res.status(201).json(getuser)
    }catch(error){
        res.status(422).json(error)
    }
})

// get individual user data

router.get("/getuser/:id",async(req,res)=>{

    try{

        console.log(req.params)
        const {id} = req.params

        const userakela = await users.findById({_id:id})
        console.log(userakela)
        res.status(201).json(userakela)
    }catch(error){
       res.status(422).json(error)
    }
})

// update user
router.patch("/update/:id",async(req,res)=>{
    const {name,email,age,mobile,work,add,desc} = req.body

    if(!name||!email||!age||!mobile||!work||!add||!desc){
        res.status(422).json("plz fill the data");
        return
    }

    try{
        const {id} = req.params

        const userupdate = await users.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(201).json(userupdate)
    }catch(err){
        res.status(422).json(err)
    }
})

//delete user
router.delete('/delete/:id',async(req,res)=>{

    try{
        const {id} = req.params

        const deleteuser = await users.findByIdAndDelete({_id:id})
        res.status(201).json(deleteuser)
    }catch(err){
        res.status(422).json(err)
    }
})

module.exports = router