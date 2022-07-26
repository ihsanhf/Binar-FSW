const express = require("express");
const app = express.Router();
const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");
const bcrypt = require("bcrypt");

// Register Page
app.get("/register", (req, res) =>
  res.render("register", { title: "Register Page", userExist: req.query.msg })
);

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  user_game.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) =>
      !user
        ? user_game.create(userData)
            .then((user_game) => {
              user_game_biodata.create({
                user_id: user_game.get("id"),
              });
              user_game_history.create({
                user_id: user_game.get("id"),
              });
              res.status(201).redirect("/?user=" + user_game.username);
            })
            .catch((err) => res.status(422).send("Cannot create users:", err))
        : res.redirect("/register?msg=userexist")
    )
    .catch((err) => res.send("ERROR: " + err));
});

module.exports = app;
