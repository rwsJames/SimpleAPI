// None of the code in this file is intended to work here and is intended to serve as a reminder 
// of an alternative structure only

// GET
app.get('/', (req, res) => {
    res.send("Hello World!!");
});
app.get("/api/courses", (req, res) => {
    res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
        return res.status(404).send("The course with the given ID was not found");

    res.send(course);
});

// POST
app.post("/api/courses", (req, res) => {
    // validity check
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(result.error.details[0].message);

    // create new course - auto incremented id
    const course = {
        id: parseInt(courses[courses.length-1].id) + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PUT
app.put("/api/courses/:id", (req, res) => {
    // presence check
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
        return res.status(404).send("The course with the given ID was not found");

    // validity check
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // update
    course.name = req.body.name;

    // respond
    res.send(course);
});

// DELETE
app.delete("/api/courses/:id", (req, res) => {
    // presence check
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) 
        return res.status(404).send("The course with the given ID was not found");
    
    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // respond
    res.send(course);
})
