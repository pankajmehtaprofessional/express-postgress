const express = require("express");
require('dotenv').config();
const app = express();

app.use(express.json());

const userRoutes = require('./routes/user.route.js');
const commentRoutes = require('./routes/comment.route.js');
const postRoutes = require('./routes/post.route.js');
require('./models');

app.use('/users', userRoutes);
app.use('/comment', commentRoutes);
app.use('/post', postRoutes);

app.listen(3001, () => console.log("Server Up!"));[]
