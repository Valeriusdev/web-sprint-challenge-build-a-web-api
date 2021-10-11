// add middlewares here related to projects

const Projects = require("./projects-model");

const verifyId = async (req, res, next) => {
    
    const {id} = req.params

    try{
        const project = await Projects.get(id);
        if(!project){
            res.status(404).json({ message: `There is no such project with this id: ${id}` })
        }else{
            req.project = project;
            next();
        }
    }catch(message){
        res.status(500).json({ error: message })
    }
};

const verifyBody = (req, res, next) => {

    const {name} = req.body;
    const {description} = req.body;
    const {completed} = req.body;
    if(!name || !description || !completed === undefined){
        res.status(400).json({ message: "Please provide name, description, and completed" })
    }else{
        req.name = name;
        req.description = description;
        req.completed = completed;
        next();
    }
}

module.exports = {
    verifyId,
    verifyBody
}
