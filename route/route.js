const router = require("express").Router();
const userController = require("../controller/user");
const exportToCsv=require("../controller/export")

router.get("/", userController.getAllUser);

router.post("/user", userController.createNewUser);

router
  .route("/user/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.get("/search/:name", userController.search);
router.get("/export",exportToCsv)

module.exports = router;
