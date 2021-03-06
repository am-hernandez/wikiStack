const router = require("express").Router();
const { User, Page } = require("../models");
const { userList, userPages } = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      const error = new Error(`User Not Found: ${req.params.id}`);
      error.status = 404;
      throw error;
      // WE NEED TO MODIFY THIS ERROR
    }
    const pages = await Page.findAll({ where: { authorId: req.params.id } });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
