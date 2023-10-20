const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

// MiddleWare 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.og9fwy4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const computerAccessoriesCollection = client.db('computerAccessoriesDB').collection('computerAccessories');
        const componentsCollection = client.db('componentsDB').collection('components');
        const accessoriesCollection = client.db('accessoriesDB').collection('accessories');
        const monitorsCollection = client.db('monitorsDB').collection('monitors');
        const networkingCollection = client.db('networkingDB').collection('networking');
        const stripCollection = client.db('stripDB').collection('strip');
        const printerCollection = client.db('printerDB').collection('printer');
        const scannerCollection = client.db('scannerDB').collection('scanner');
        const serversCollection = client.db('serversDB').collection('servers');
        const storageCollection = client.db('storageDB').collection('storage');

        app.get('/computeraccessories', async(req, res)=>{
            const cursor = computerAccessoriesCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/components', async(req, res)=>{
            const cursor = componentsCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/accessories', async(req, res)=>{
            const cursor = accessoriesCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/monitors', async(req, res)=>{
            const cursor = monitorsCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/networking', async(req, res)=>{
            const cursor = networkingCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/strip', async(req, res)=>{
            const cursor = stripCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/printer', async(req, res)=>{
            const cursor = printerCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/scanner', async(req, res)=>{
            const cursor = scannerCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/servers', async(req, res)=>{
            const cursor = serversCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/storage', async(req, res)=>{
            const cursor = storageCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })

        // Create Post 

        app.post('/computeraccessories', async(req, res)=>{
            const newComputerAccessories = req.body;
            console.log(newComputerAccessories);
            const result = await computerAccessoriesCollection.insertOne(newComputerAccessories);
            res.send(result)
        })

        app.post('/components', async(req, res)=>{
            const newComponents = req.body;
            console.log(newComponents);
            const result = await componentsCollection.insertOne(newComponents);
            res.send(result)
        })

        app.post('/accessories', async(req, res)=>{
            const newAccessories = req.body;
            console.log(newAccessories);
            const result = await accessoriesCollection.insertOne(newAccessories);
            res.send(result)
        })

        app.post('/monitors', async(req, res)=>{
            const newMonitors = req.body;
            console.log(newMonitors);
            const result = await monitorsCollection.insertOne(newMonitors);
            res.send(result)
        })

        app.post('/networking', async(req, res)=>{
            const newNetworking = req.body;
            console.log(newNetworking);
            const result = await networkingCollection.insertOne(newNetworking);
            res.send(result)
        })

        app.post('/strip', async(req, res)=>{
            const newStrip = req.body;
            console.log(newStrip);
            const result = await stripCollection.insertOne(newStrip);
            res.send(result)
        })

        app.post('/printer', async(req, res)=>{
            const newPrinter = req.body;
            console.log(newPrinter);
            const result = await printerCollection.insertOne(newPrinter);
            res.send(result)
        })

        app.post('/scanner', async(req, res)=>{
            const newScanner = req.body;
            console.log(newScanner);
            const result = await scannerCollection.insertOne(newScanner);
            res.send(result)
        })

        app.post('/servers', async(req, res)=>{
            const newServers = req.body;
            console.log(newServers);
            const result = await serversCollection.insertOne(newServers);
            res.send(result)
        })

        app.post('/storage', async(req, res)=>{
            const newStorage = req.body;
            console.log(newStorage);
            const result = await storageCollection.insertOne(newStorage);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('KING BAZZARS ECOMMERCE SITES SERVER IS RUNNING')
})

app.listen(port, () => {
    console.log(`KING BAZZER SERVER IS RUNNING ON POSRT : ${port}`)
})