const express = require("express");
const cors = require("cors");
const actorsRouter = require("./routes/actors")

const app = express();
app.use(cors())
//app.use(express.json());



// Default route with simple response for verification
app.get("/api", (req, res) => {
    res.json({"message": "ok"})
})

// Delegate to router
app.use("/api/actors", actorsRouter)
// .
// .
// .

// Error handling
app.use((err, req, res, next) => {
    console.error(err.message, err.stack)
    res.status(err.statusCode || 500).json({"message": err.message})

    return
})




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

