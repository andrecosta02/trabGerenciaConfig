require("dotenv").config({ path: "./variable.env" })
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const routes = require("./src/routes")
const server = express()

server.use(bodyParser.json())
server.use(cors())
server.use("/tasks", routes)

// server.listen(process.env.PORT)

server.listen(process.env.PORT, () => {

    const date = new Date()
    const hour = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}h`
    const fullDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`

    console.log(`Serviço iniciado em http://localhost:${process.env.PORT}/tasks, as ${hour} - ${fullDate} \n`)

})

