var friends = require("../data/friends");

module.exports = function (app) {
    // Post to json
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        var user = req.body;

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriend = 0;
        var minDiff = 40;

        for (var i = 0; i < friends.length; i++) {
            var totalDiff = 0;
            for (var q = 0; q < friends[i].scores.length; q++) {
                var difference = Math.abs(user.scores[q] - friends[i].scores[q]);
                totalDiff += difference;
            }

            if (totalDiff < minDiff) {
                bestFriend = i;
                minDiff = totalDiff;
            }
        }


        friends.push(user);

        res.json(friends[bestFriend]);
    });
};