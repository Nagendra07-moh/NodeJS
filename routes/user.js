const express = require('express')
const router = express.Router();



router.get('/',async (req,res)=>{
   const allUsers = await user.find({}); //this is to fetch data from mongo db collection called - user
   return res.json(allUsers)


})

//working with dynamic path parameters

router.get('/:userId',(req,res)=>{
   const uid = req.params.userId;
   const id = Number(uid);
   let found_user = users.find((i)=> i.id === id);
   return res.json(found_user);
})

router.post('/',(req,res)=>{
   console.log(req.body);
   const body = req.body;
 
   users.push({id:users.length + 1,...body});
   fs.writeFile('./data.json',JSON.stringify(users),(err,data)=>{

      return res.json({status: "done_appending"})
   })
})

// HOW TO MERGE MULTIPLE TYPE OF API IF(PUT,DELETE) INTO ONE ROUTE;



router.route('/api/users/:id').get( async (req,res)=>{  
   const findUser = await user.findById(req.params.id); //to perform SEARCHING on model named user in mongoDB by using id
   res.send(findUser);
}).patch (async (req,res)=>{
   await user.findByIdAndUpdate(req.params.id, {lastName : "Changed"}) //update
   res.json({status:"changed"})
}).delete(async(req,res)=>{
   await user.findByIdAndDelete(req.params.id);  //delete  
   return res.json({status:"deleted"})
});

module.export = router;