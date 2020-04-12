const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: false,
        required: false,
    },
    password: {
        type: String,
        unique: false,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    goals: [
        {
            type: Schema.Types.ObjectId,
            ref: "Goal",
        },
    ],
});


// Define schema methods
userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10);
    }
};
// Define schema methods
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
};


// usersSchema.methods.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// usersSchema.methods.validPassword = function (password, encrypted) {
//     return bcrypt.compareSync(password, encrypted);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;

