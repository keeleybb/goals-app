
const router = require("express").Router();
const userController = require("../../controllers/userController");
const User = require("../../models/user");
const passport = require("../../passport");

router.route("/signup")
    .post(userController.create)

router.get("/", (req, res, next) => {
    console.log("===== user!!======");
    console.log(req.user);
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post(
    "/login",
    function (req, res, next) {
        console.log("routes/user.js, login, req.body: ", req.body);
        console.log(req.body);
        next();
    },
    passport.authenticate("local"),
    (req, res) => {
        console.log("logged in", req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
);

router.post("/logout", (req, res) => {
    if (req.user) {
        console.log("logout", req.user)
        req.logout();
        res.send({ msg: "logging out" });
    } else {
        res.send({ msg: "no user to log out" });
    }
});

module.exports = router;

