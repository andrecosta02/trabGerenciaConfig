const express = require("express")
const router = express.Router()

const tasksController = require("./controllers/tasksController")

router.get("/list", tasksController.listAll)
router.get("/list/:id", tasksController.listOne)
router.post("/register", tasksController.register)
router.put("/update/:id", tasksController.update)
router.delete("/delete/:id", tasksController.delete)

module.exports = router