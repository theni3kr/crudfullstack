const mongoose = require("mongoose")

const DB = process.env.DATABASE


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("DB connection start")).catch((err)=> console.log(err.message))