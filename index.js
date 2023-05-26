const { MongoClient ,ServerApiVersion} = require('mongodb');
const express = require ('express')
const cors = require('cors')
const app = express()
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 5000
// midddleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://Practice:uP6ifBFwa0fsHWo7@cluster0.i8wrn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        const database = client.db("Practice");
        const fastOneCollection = database.collection("Banner");
        const movieCollection = database.collection("Movie");
        const questionCollection = database.collection("Question");
        const tvSerisCollection = database.collection("TvSeris");
        const websiteUserCollection = database.collection("User");
        

        // Banner 
        app.post('/bannerInformation',async(req,res)=>{
            const newUpdate = req.body;
            const result = await fastOneCollection.insertOne(newUpdate)
            res.json(result)
        })
        app.get('/bannerInformation',async(req,res)=>{
            const cursor = fastOneCollection.find({})
            const newUpdate = await cursor.toArray()
            res.send(newUpdate)
        })
        app.get('/bannerInformation/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await fastOneCollection.findOne(query)
            res.send(result)
        })
        app.delete('/bannerInformation/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await fastOneCollection.deleteOne(query)
            res.json(result)
        })
        // movie 
        app.post('/movie',async(req,res)=>{
            const newUpdate = req.body;
            const result = await movieCollection.insertOne(newUpdate)
            res.json(result)
        })
        app.get('/movie',async(req,res)=>{
            const cursor = movieCollection.find({})
            const newUpdate = await cursor.toArray()
            res.send(newUpdate)
        })
        app.get('/movie/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const user =  await movieCollection.findOne(query)
            console.log(user)
            res.json(user)
        })
        //DELETE API
        app.delete('/movie/:id',async(req,res)=>{
            const id = req.params.id
            const query = {_id:ObjectId(id)}
            const result = await movieCollection.deleteOne(query)
            console.log('deleting data from database',result)
            res.json(result)

        })
        
        // Create Question 
        app.post('/question',async(req,res)=>{
            const question = req.body;
            const result = await questionCollection.insertOne(question)
            res.json(result)
        })
        app.get('/question',async(req,res)=>{
            const question = questionCollection.find({})
            const result = await question.toArray()
            res.send(result)
        })
        app.get('/question/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await questionCollection.findOne(query)
            res.send(result)
        })
        app.delete('/question/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await questionCollection.deleteOne(query)
            res.json(result)
        })
        //Create Tv Seris
        app.post('/tvserisupload',async(req,res)=>{
            const tvSeris = req.body;
            const result = await tvSerisCollection.insertOne(tvSeris)
            res.json(result)
        })
        app.get('/tvserisupload',async(req,res)=>{
            const tvseris = tvSerisCollection.find({})
            const newTvseris = await tvseris.toArray()
            res.send(newTvseris)
        })
        app.get('/tvserisupload/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result =await tvSerisCollection.findOne(query)
            res.json(result)
        })
        app.delete('/tvserisupload/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await tvSerisCollection.deleteOne(query)
            res.json(result)
        })
        // website user 
        app.post('/user',async(req,res)=>{
            const user = req.body;
            const result = await websiteUserCollection.insertOne(user)
            console.log(result)
            res.json(result)
        })
        app.get('/user',async(req,res)=>{
            const user = websiteUserCollection.find({})
            const result =await user.toArray()
            console.log(result)
            res.send(result)
        })
        app.put('/user',async(req,res)=>{
            const user = req.body;
            const filter = {email:user.email};
            const option = {upsert:true};
            const updateDoc = {$set:user};
            const reuslt =await websiteUserCollection.updateOne(filter,updateDoc,option)
            res.json(reuslt)
        })

        // Role 
        app.put('/user/admin',async(req,res)=>{
            const user = req.body;
            const filter = {email:user.email}
            const updateDoc = {$set:{role:'admin'}}
            const result = await websiteUserCollection.updateOne(filter,updateDoc)
            console.log(result)
            res.json(result)
        })

        app.get('/user/:email',async(req,res)=>{
            const adminUser = req.params.email;
            const query = {email:adminUser};
            const user = await websiteUserCollection.findOne(query)
                let isAdmin = false;

                    if(user?.role === 'admin'){
                        isAdmin = true
                    }
                res.json({admin:isAdmin})
        })
        
        
    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

