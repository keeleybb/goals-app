const router = require("express").Router();
const soulController = require("../../controllers/soulController");

// Matches with "/api/soul"
router.route("/")
    .get(soulController.findById)
    .post(soulController.create);

router.route("/all")
    .get(soulController.findAll)

// Matches with "/api/soul/:id"
router
    .route("/:id")
    .get(soulController.findById)
    .post(soulController.create)
    .put(soulController.update)
    .delete(soulController.remove);


module.exports = router;