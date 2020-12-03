const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const connectStore = require('connect-mongo');

// configures for .env files
require('dotenv').config();

// configure express server
const app = express();
const MongoStore = connectStore(session)
const port = process.env.PORT || 5000;

// hide express middleware from browser
app.disable('x-powered-by');

app.use(cors());
// parse send/receive json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uri from mongoDB goes here
const uri = process.env.ATLAS_URI;

// connect to database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

const connection = mongoose.connection;

// setup session
app.use(session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    store: new MongoStore({
        mongooseConnection: connection,
        collection: 'session',
        ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: parseInt(process.env.SESS_LIFETIME)
    }
}));

connection.once('open', () => {
    console.log("MongoDB database connection established");
});

// require route files
const projectRouter = require('./routes/project');
const adminRouter = require('./routes/admin');
const projectTypeRouter = require('./routes/projecttype');
const sessionRouter = require('./routes/session');
// const fishTypeRouter = require('./routes/fishtype');

// use route files
app.use('/projects', projectRouter);
app.use('/admin', adminRouter);
app.use('/projecttype', projectTypeRouter);
app.use('/session', sessionRouter);
// app.use('/fish', fishTypeRouter);

// start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});