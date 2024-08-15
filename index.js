const express = require('express');
const cors = require('cors');
const app = express();
const brandsData = require('./brandData.json');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

// MiddleWare 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.trhzw6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
        // await client.connect();

        const allProducts = client.db('kingBazarDB').collection('AllProducts');
        const allUser = client.db('kingBazarDB').collection('AllUser');

     
     
        app.get('/allProducts', async(req, res) => {
            const cursor = allProducts.find();
            const result = await cursor.toArray()
            res.send(result)            
        })

        app.get('/allProducts/:name', async(req, res) => {
            const name = req.params.name;
            const query = { productBrand: name}
            const cursor = allProducts.find(query)
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id)};
            const result = await allProducts.findOne(query)
            res.send(result)
        })

        // Create Post 

        app.post('/allProducts', async(req, res) => {
            const newProduct = req.body;
            const result = await allProducts.insertOne(newProduct);
            // console.log(newProduct);
            res.send(result);
        })


        // Update Post 
        app.put('/products/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateProduct = req.body;
            const productPreview = {
                $set: {
                    productImg: updateProduct.productImg,
                    productName: updateProduct.productName,
                    productBrand: updateProduct.productBrand,
                    productType: updateProduct.productType,
                    productDescription: updateProduct.productDescription,
                    productPrice: updateProduct.productPrice,
                    productRating: updateProduct.productRating,

                }
            }
            const result = await allProducts.updateOne(filter, productPreview, options);
            res.send(result);
        })

        // UserCreate Related Api 
        app.post('/user', async(req, res)=>{
            const user = req.body;
            const result = await allUser.insertOne(user)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
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
app.get('/brands', (req, res) => {
    res.send(brandsData)
})
app.get('/brands/:id', (req, res) => {
    const id = req.params.id;
    const findData = brandsData.find(brand => brand.id === parseInt(id));
    // console.log(id, findData);
    res.send(findData)
})



app.listen(port, () => {
    console.log(`KING BAZZER SERVER IS RUNNING ON POSRT : ${port}`)
})