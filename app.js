const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}));
// make sure to replace my db string & creds with your own
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-m6qau.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
).then(() => {
    console.log(11111)
    app.listen(4000, () => {
        console.log('listning to port 4000');
    });
}).catch(err => {
    console.log(err);
});