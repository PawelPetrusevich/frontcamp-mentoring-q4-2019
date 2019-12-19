const express = require("express");
const router = express.Router();
const newsController = require("../controller/newsController");

router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.post("/", newsController.addNews);
router.put("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

module.exports = router;