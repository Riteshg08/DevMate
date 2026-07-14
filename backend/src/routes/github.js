const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const githubRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const GithubStats = require("../models/githubStats");

const ONE_HOUR = 60 * 60 * 1000;

// reused for every GitHub API call, so we don't repeat this object everywhere
const githubHeaders = {
    headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
};

githubRouter.get("/profile/github-stats/:githubUsername", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const githubUsername = req.params.githubUsername;

        // check if we already have cached stats for this user
        let stats = await GithubStats.findOne({ userId: loggedInUser._id });

        const isStale = !stats || (Date.now() - new Date(stats.fetchedAt).getTime() > ONE_HOUR);

        if (isStale) {
            // fetch fresh data from GitHub's public API
            const githubRes = await axios.get(`https://api.github.com/users/${githubUsername}`,githubHeaders);
            const githubUser = githubRes.data;

            // GitHub doesn't give total stars directly - need to sum up each repo's stars
            const reposRes = await axios.get(`https://api.github.com/users/${githubUsername}/repos?per_page=100`,githubHeaders);
            const totalStars = reposRes.data.reduce((sum, repo) => sum + repo.stargazers_count, 0);

            const newStatsData = {
                userId: loggedInUser._id,
                repos: githubUser.public_repos,
                stars: totalStars,
                followers: githubUser.followers,
                fetchedAt: new Date()
            };

            // update if it exists, create if it doesn't
            stats = await GithubStats.findOneAndUpdate(
                { userId: loggedInUser._id },
                newStatsData,
                { upsert: true, new: true }
            );
        }

        res.json({ message: "GitHub stats fetched", data: stats });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = { githubRouter };