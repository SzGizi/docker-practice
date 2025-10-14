const exress = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = exress();
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('up');
});

console.log('connect to MongoDB');
mongoose.connect('mongodb://mongodb/key-value-db', {
    auth:{
        username: 'key-value-user',
        password: 'key-value-password'
    },
    connectTimeoutMS:500
}).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

