// Write your "actions" router here!

const express = require("express");
const Actions = require ("./actions-model");
const { verifyId, verifyBody } = require("./actions-middlware");
const router = express.Router();

router.get("/", (req, res, next) => {
    Actions.get()
    .then(actions => {
        if(!actions){
            res.json([])
        }else{
            res.json(actions)
        }
    })
    .catch(err => next(err))
});

router.get("/:id", verifyId, (req, res) => {
    res.json(req.actions)
});

router.post("/", verifyBody, (req, res, next) => {
    Actions.insert({project_id: req.project_id, description: req.description, notes: req.notes})
    .then(myNewAction => {
        res.status(201).json(myNewAction);
    })
    .catch(err => next(err))
});

router.put("/:id", verifyId, verifyBody, (req, res, next) => {
    Actions.update(req.params.id, { project_id: req.project_id, description: req.description, notes: req.notes, completed: req.completed })
    .then(myUpdatedAction => {
        res.json(myUpdatedAction)
    })
    .catch(err => next(err))
});

router.delete("/:id", verifyId, async (req, res, next) => {
    try{
        await Actions.remove(req.params.id);
        res.status(200).json({ message: "This action was deleted" })

    } catch(err) {
        next(err)
    }
});

router.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: "Request can't be completed",
      error: err.message   
    });
});



module.exports = router;
