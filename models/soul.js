const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soulSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    Time: [
        {
            startTime: {
                type: Date,
                default: () => new Date(+new Date() - 60 * 3000)
            },
            stopTime: {
                type: Date,
                default: Date.now
            },
            duration: {
                type: Number
            }
        }
    ]
});

const Soul = mongoose.model("Soul", soulSchema);

module.exports = Soul;

