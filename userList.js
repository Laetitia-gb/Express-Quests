const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req,res) => {
  const { firstname, lastname, email, city, langage} = req.body;

  database
  .query (
    "INSERT INTO user(firstname, lastname, email, city, langage) VALUES (?,?,?,?,?)",
    [firstname, lastname, email, city, language]
  )
  .then(([result]) => {
    res.location(`/api/user/${result.insertId}`).sendStatus(201);
  })
 .catch((err) => {
  console.error(err);
  res.status(500).send("Error saving user")
 });
};

constupdateUser = (req,res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, langage} = req.body;
  
  database
  .query (
    "UPDATE users set firstname=?, email=?, city=?, langage=? where id = ?",
    [firstname,lastname,email,city,langage, id]
    )
  .then(([result]) => {
    if (result.affectedRows ===0) {
      res.status(404).send("Not Found");
    } else {
      res.status(204);
    }
  })
  .catch((error) => {
    console.error(err);
    res.status(500).send("Error editing the user");
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
};













