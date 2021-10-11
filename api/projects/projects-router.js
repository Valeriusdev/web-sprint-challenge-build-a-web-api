// Write your "projects" router here!

const express = require("express");
const Projects = require ("./projects-model");
const { verifyId, verifyBody } = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
    Projects.get()
    .then(projs => {
        if(!projs){
            res.json([])
        }else{
            res.json(projs)
        }
    })
    .catch(err => next(err))
});

router.get("/:id", verifyId, (req, res) => {
    res.json(req.project)
});

router.post("/", verifyBody, (req, res, next) => {
    Projects.insert({name: req.name, description: req.description, completed: req.completed})
    .then(MyNewProj => {
        console.log("my new project", MyNewProj)
        res.status(201).json(MyNewProj);
    })
    .catch(err => next(err))
});

router.put("/:id", verifyId, verifyBody, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description, completed: req.completed })
    .then(MyUpdatedProj => {
        res.json(MyUpdatedProj)
    })
    .catch(err => next(err))
});


router.delete("/:id", verifyId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id);
        res.status(200).json({ message: "This project was deleted" })

    } catch(err) {
        next(err)
    }
});

router.get("/:id/actions", verifyId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.json(actions)
    })
    .catch(err => next(err))
});



router.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: "Request can't be completed",
      error: err.message   
    });
});


module.exports = router;
