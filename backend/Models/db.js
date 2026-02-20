const Mongoose = require('mongoose');
Mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log("MONGODB connected successfully......");
        })
        .catch((err)=>{
            console.log("Error connecting to MongoDB:", err);
        })