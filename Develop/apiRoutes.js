const fs = require("fs");
const uniqid = require('uniqid');
const path = require("path");
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    // fs.readFile("./db/db.json", (err, data) => { //read the database file
    //   if (err) { throw err };
    //   console.log(JSON.parse(data))


    // })
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

  app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => { //read the database file
      if (err) { throw err };
      currentDatabase = JSON.parse(data)// then get current database, store in a variable
      uniqueId = uniqid() // create a variable holds a unique id
      newRequest = req.body // store incoming data in a variable
      newRequest.id = uniqueId // give incoming data a unique id
      // console.log(newRequest)
      currentDatabase.push(newRequest)// push incoming data into the current database
      // console.log(currentDatabase)

      fs.writeFile("./db/db.json", JSON.stringify(currentDatabase), (err) => { // write new file containing the new incoming note
        if (err) { throw err };
        console.log("successfully added new note")
        console.log(currentDatabase)
        res.json(currentDatabase);
      })
    })
  })


  app.delete("/api/notes/:id", function (req, res) {
    const requestId = req.params.id;
    fs.readFile("./db/db.json", (err, data) => { //read the database file
      if (err) { throw err };
      const currentArray = JSON.parse(data) // store the current database in a variable
      const newArray = currentArray.filter((note)=> {return note.id !== requestId}) // create a new array only containing the notes we don't want to delete
      fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => { // Rewrite new file after deleting the desired note
        if (err) { throw err };
        res.send(newArray);
        console.log("successfully deleted note")
            })
    })
  })
}

