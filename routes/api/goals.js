const router = require("express").Router();
const goalController = require("../../controllers/goalController");

// Matches with "/api/books"
router.route("/")
    .get(goalController.findById)
    .post(goalController.create);

router.route("/all")
    .get(goalController.findAll)

// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(goalController.findById)
    .put(goalController.updateTask)
    .delete(goalController.remove);
// Matches with "/api/goal/task/:id"
router
    .route("/task/:id")
    .put(goalController.completeTask)

router
    .route("/task-remove/:id")
    .put(goalController.removeTask)

module.exports = router;