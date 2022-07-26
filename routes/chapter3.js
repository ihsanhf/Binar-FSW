const express = require("express");
const router = express();

router.use(express.Router());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res, next) => {
  const name = req.query.name;
  res.render("chapter3", { title: "Traditional Games", name: name });
});

router.post("/", (req, res, next) => {
  const user = req.query;
  console.log(user);

  // .send({
  //   name: user.name,
  //   email: user.email,
  //   password: user.password,
  // })
  res.render("chapter3", { title: "Traditional Games", name: user.name });
});

module.exports = router;
