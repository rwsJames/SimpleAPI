const db = require("./db")



//////// ACTOR

//// GET ALL

// get every actor in db to a default limit of 1000 records
// optionally specify an offset, page
async function getActors(offset = 0, howmany = 1000)
{
    const rows = await db.query(
        "SELECT * FROM actor LIMIT ?, ?",
        [offset, howmany]
    )
    
    return !rows ? [] : rows
}

//// GET SOME

// should only ever return one item but will always do so in a collection
async function getActorsByID(id)
{
    const rows = await db.query(
        "SELECT * FROM actor WHERE actor_id = ?;",
        [id]
    )

    return !rows ? [] : rows
}

async function getActorsByExactLastName(str)
{
    const rows = await db.query(
        "SELECT * FROM actor WHERE last_name = ?;",
        [str.toUpperCase()]
    )

    return !rows ? [] : rows
}

//// POST ONE

async function postActor(actor)
{
    const rows = await db.query(
        "INSERT INTO actor(first_name, last_name) VALUES (?, ?);",
        [actor.first_name, actor.last_name]
    )

    return !rows ? [] : rows
}

//// PUT ONE
async function putActor(actor)
{
    const rows = await db.query(
        "UPDATE actor SET first_name = ?, last_name = ? WHERE actor_id = ?;",
        [actor.first_name, actor.last_name, actor.id]
    )

    return !rows ? [] : rows
}

//// PATCH ONE
async function patchActor(actor, id)
{
    // leveraging mariadb's IFNULL means that no data manipulation has to happpen to see if a value is empty or not
    // noor is there a need for an additional GET query, with the information of the other attribues
    const rows = await db.query(
        "UPDATE actor SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name) WHERE actor_id = ?;",
        [
            actor.first_name || null,
            actor.last_name || null, 
            id
        ]
    )

    return !rows ? [] : rows
}

//// DELETE ONE
async function deleteActor(id)
{
    const rows = await db.query(
        "DELETE FROM actor WHERE actor_id = ?;",
        [id]
    )

    return !rows ? [] : rows
}



module.exports = {
    getActors,
    getActorsByID,
    getActorsByExactLastName,
    postActor,
    putActor,
    patchActor,
    deleteActor
}