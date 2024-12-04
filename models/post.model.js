const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const User = require("./user.model.js");


class Post extends Model {}

Post.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "posts",
    timestamps: true,
});

module.exports = Post;