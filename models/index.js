const sequelize = require('../db');
const User = require('./user.model.js');
const Post = require('./post.model.js');
const Comment = require('./comment.model.js');


User.hasMany(Post, {
    foreignKey: "userId"
});

User.hasMany(Comment, {
    foreignKey: "userId"
});

Post.belongsTo(User, {
    foreignKey: "userId"
});

Post.hasMany(Comment, {
    foreignKey: "postId"
});

Comment.belongsTo(Post, {
    foreignKey: "postId"
});

Comment.belongsTo(User, {
    foreignKey: "userId"
});

sequelize.sync({ force: true })
  .then(() => console.log('Models synced with database.'))
  .catch((error) => console.error('Error syncing models:', error));

module.exports = { User, Post, Comment };
