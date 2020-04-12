const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    goal: { type: String, trim: true, required: "no empty goal names" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    targetDate: { type: Date, default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) },
    Tasks: [
        {
            name: {
                type: String,
                trim: true,
                required: "no empty task names"
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            targetDate: {
                type: Date,
                default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000)
            },
            complete: {
                type: Boolean,
                default: false
            }
        }
    ]
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;

// author: { type: Schema.Types.ObjectId, ref: "User" },
