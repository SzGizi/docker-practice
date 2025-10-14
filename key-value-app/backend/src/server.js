const exress = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT;
const app = exress();
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('up');
});

console.log('connect to MongoDB');
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`, {
    auth:{
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS:500
}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

