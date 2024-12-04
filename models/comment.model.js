const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js")


class Comment extends Model {}

Comment.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "comments",
    timestamps: true,
});

module.exports = Comment;