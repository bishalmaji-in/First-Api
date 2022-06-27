// const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const courses=[{id:1,name:'course 1'},{id:2,name:'course 2'},{id:3,name:'course 3'}];
app.get('/',(req,res)=>{
res.send('hello world');
});

//reading

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
//
app.get('/api/courses/:id',(req,res)=>{
let course  = courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
 res.status(404).send('the given id not found');   
}
res.send(course);
});

//inserting data

app.post('/api/courses',(req,res)=>{
    // //npm joy for validating package
    //  const schema={
    //     name: Joi.string().min(3).required()

    //  };
    // const result= Joi.valid(req.body,schema);
    // if(result.error){
    //     // res.status(400).send(result.error.);
    //     return;
    // }
    if(!req.body.name|| req.body.name.length<3){
    res.status(400).send('Name is required and should be of min 3 char');
    return;
    }

const course={
id: courses.length+1,
name: req.body.name
};

courses.push(course);
//return the data added by the client to the client with response, this is convenction 
res.send(course);
});

//update

app.put('/api/courses/:id',(req,res)=>{
//look up the course if not exist return 440- not found errror
let course  = courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
 res.status(404).send('the given id not found');  
 return; 
}
//validate , if incorrect data return 400 -bad request
if(!req.body.name|| req.body.name.length<3){
    res.status(400).send('Name is required and should be of min 3 char');
    return;
}
//every thing good updata the data and return the responst to the user
course.name=req.body.name;
res.send(course);
});

//deleting data

app.delete('/api/courses/:id',(req,res)=>{
    //look up the code;
let course  = courses.find(c=>c.id===parseInt(req.params.id));
if(!course){
 res.status(404).send('the given id not found in page');  
 return; 
}
const index=courses.indexOf(course);
courses.splice(index,1);
res.send(course);
});
// app.get('/api/posts/:year/:month',(req,res)=>{
//     res.send(req.params);
//     });
const port=process.env.PORT||9980;
app.listen(port,()=>{
    console.log(`listining on port ${port}`);
}); 
