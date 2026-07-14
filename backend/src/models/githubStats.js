const mongoose = require('mongoose');

const githubStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    repos: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    fetchedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GithubStats", githubStatsSchema);