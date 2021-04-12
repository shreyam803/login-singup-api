const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL_DEV;

mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
},
console.log('connected to database')
);



