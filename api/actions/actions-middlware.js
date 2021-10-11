// add middlewares here related to actions

const Actions = require("./actions-model");

const verifyId = async (req, res, next) => {

    const {id} = req.params

    try{
        const actions = await Actions.get(id);
        if(!actions){
            res.status(404).json({ message: `There is no such action with this id ${id}` })
        }else{
            req.actions = actions;
            next();
        }
    }catch(message){
        res.status(500).json({ error: message })
    }
};

const verifyBody = (req, res, next) => {

    const { project_id } = req.body;
    const { description } = req.body;
    const { notes } = req.body
    const {completed} = req.body;
    if(!project_id || !description || !notes || !completed === undefined){
        res.status(400).json({ message: "Please provide project id, description, notes, and completed" })
    }else{
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        req.completed = completed;
        next();
    }
}

module.exports = {
    verifyId,
    verifyBody
}
