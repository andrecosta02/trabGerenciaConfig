// const clientService = require("../services/clientService")
// const { validationResult } = require('express-validator');
// const { body, param } = require('express-validator');

const date = new Date()
const fullDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}`

let tasks = [];
// Testando conflito 1

module.exports = {

    listAll: async (req, res) => {
        res.json(tasks);
    },



    listOne: async (req, res) => {
        const task = tasks.find(task => task.id === parseInt(req.params.id));

        if (!task) 
        return res.status(404).send('The task with the given ID was not found.');

        res.send(task);
    },



    filter: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.query.clientId
        let clientName = req.query.clientName
        let client = await clientService.filter(clientId, clientName)

        if(client) {
            json.result = client
        } else {
            json.message = "Não foram encontrados clientes com esse ID"
        }

        res.json(json)
        IpPublicQuery(req)
    },


    register: async (req, res) => {
        // tasks = [];


        const task = {
            id: tasks.length + 1,
            name: req.body.name,
            description: req.body.description,
            dueDate: req.body.dueDate,
            status: req.body.status
        };
        
        tasks.push(task);
        res.status(201).json(task);

    },



    update: async (req, res) => {
        const task = tasks.find(task => task.id === parseInt(req.params.id));
        if (!task) return res.status(404).send('The task with the given ID was not found.');

        task.name = req.body.name;
        task.description = req.body.description;
        task.dueDate = req.body.dueDate;
        task.status = req.body.status;

        res.send(task);
    },

    delete: async (req, res) => {
        const task = tasks.find(task => task.id === parseInt(req.params.id));
        if (!task) return res.status(404).send('The task with the given ID was not found .');

        const index = tasks.indexOf(task);
        tasks.splice(index, 1);

        res.send(task);
    },




}

function IpPublicQuery(req) { 
    console.log(` - ${req.method}`)
    console.log(` - ${req.connection.remoteAddress} } \n`) 
}

