const express = require("express");
const cors = require("cors");
const friends = require("./friends");
const morgan = require("morgan");

const app = express();
app.use(cors({
    origin: "http://localhost:3000" // Our Vue app.
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/friends", (req, res) => {
    res.status(200).json({
        friends
    });
});

app.post("/friends", (req, res) => {
    const id = friends.length + 1;
    const first_name = req.body.first_name || "Jane";
    const last_name = req.body.last_name || "Doe";
    const email = req.body.email || "abc@gmail.com";
    const gender = req.body.gender || "Male";
    const address = req.body.address || "Default Address";

    const newFriend = {
        id, first_name, last_name, email, gender, address
    };

    friends.push(newFriend);

    res.status(201).json({
        friend: newFriend
    });
});

app.listen(8000, () => console.log("Listening on port 8000..."));