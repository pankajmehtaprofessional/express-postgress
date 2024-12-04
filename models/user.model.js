const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Post = require("./post.model.js");

class User extends Model {}

User.init({
    fName: {
        type: DataTypes.STRING
    },
    lName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "users",
    timestamps: true,
});

module.exports = User;