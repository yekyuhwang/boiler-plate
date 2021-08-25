const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://yekyu:hwang93@cluster0.tyn62.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
res.send("Hello World")
})

app.listen(PORT, () => {
console.log(`🍀 ${PORT} Server Start With Express`)
})

