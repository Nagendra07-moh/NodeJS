const express = require('express')
const users = require('./data.json');
const app = express();
const fs = require('fs');
const port = 8000;
const userRouter = require('./routes/user');

const user = require('./modles/users');
// this is middleware
app.use(express.urlencoded({extended:false}));


// This is to print all the users name in a bullet point



// CREATING  MY OWN CUSTOM MIDDLEWARE
app.use((req,res,next)=>{
   console.log("Hello from middleWare 1");
   next();
});

app.use((req,res,next)=>{
   console.log("Time stamp has been recorded");
   fs.appendFile("log.txt",`${Date.now()} : ${req.method} : ${req.path}`,(errr,data)=>{
      next();
   });
})

// ROUTERS

app.use("/users",userRouter); //it simply means that all the requests at /users route shoud be catered by userRouter....

// STEP-3=>  Connect with mongo db

const {connectMongodB} = require('./connection')

connectMongodB('mongodb://127.0.0.1:27017/my-db-1')

//push into db
// THIS IS TO CREATE AND USER COLLECTION INTO THE DB AND PUSH DETAILS INTO THAT COLLECTION
app.post("/api/users/add",async (req,res)=>{
   const body = req.body;
   if(
      !body || 
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender||
      !body.job_title
      ){
         return res.status(404).json({msg:"All fields are required"});
      }

      console.log(body);

      const result = await user.create({
         firstName: body.first_name,
         lastName: body.last_name,
         email:body.email,
         gender : body.gender,
         jobTitle:body.jobTitle
      })

      // console.log(result);

      return res.status(201).json({msg:"sucess"});
});
   
   




app.listen(port,()=>{
   console.log(`Server is running on ${port}`);
});