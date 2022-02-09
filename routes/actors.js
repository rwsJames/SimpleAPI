const Joi = require("joi");
const express = require("express")
const router = express.Router()
const actors = require("../services/actors")

////// /api/actors

//// GET

// ALL ACTORS
router.get('/', async function (req, res, next) {
    try
    {
        res.json(await actors.getActors(req.query.offset, req.query.howmany))
    }
    catch (err)
    {
        console.log("Error while trying to get all actors from database")
        console.log("Query string passed: ", req.query)
        
        console.error(err.message)
        next(err)
    }
})

// SOME ACTORS
router.get('/:id', async function (req, res, next) {
    try
    {
        res.json(await actors.getActorsByID(req.params.id))

    }
    catch (err)
    {
        console.log("Error while trying to get actors from database using id")
        console.log("Param passed: ", req.params.id)
        
        console.error(err.message)
        next(err)
    }
})

//// POST

router.post('/', async function (req, res, next) {
    const { error } = validateActor(req.body);
    if (error)
        return res.status(400).send(res.body);

    const actor = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };

    try
    {
        actors.postActor(actor)
        res.send(actor)
    }
    catch (err)
    {
        console.log("Error when posting valid actor to database")
        console.log("Valid actor passed:\n", actor)

        console.error(err.message)
        next(err)
    }
})

//// PUT
router.put('/:id', async function (req, res, next) {
    const { error } = validateActor(req.body);
    if (error)
        return res.status(400).send(res.body);

    const actor = {
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };

    try
    {
        res.json(await actors.putActor(actor))
    }
    catch (err)
    {
        console.log("Error when putting valid actor in database")
        console.log("Valid actor passed:\n", actor)

        console.error(err.message)
        next(err)
    }
})

//// PATCH
router.patch('/:id', async function (req, res, next) {
    const { error } = validateActor(req.body);
    if (error)
        return res.status(400).send(res.body);
    
    try
    {
        res.json(await actors.patchActor(req.body, req.params.id))
    }
    catch (err)
    {
        console.log("Error when patching valid actor in database")
        console.log("Valid actor passed:\n", req.body)

        console.error(err.message)
        next(err)
    }
})

//// DELETE
router.delete('/:id', async function (req, res, next) {
    try
    {
        res.json(await actors.deleteActor(parseInt(req.params.id)))
    }
    catch (err)
    {
        console.log("Error when deleting actor from database")
        console.log("ID passed: ", req.params.id)

        console.error(err.message)
        next(err)
    }
})

//// OTHER
// contains schema/rules for all updateable or needed attributes
function validateActor(actor)
{
    const schema = Joi.object({
        actor_id: Joi.number().integer().min(1),
        first_name: Joi.string().uppercase().max(45),
        last_name: Joi.string().uppercase().max(45),
    });
    return schema.validate(actor, {"convert": false}); // prevent changing case of names
}

module.exports = router