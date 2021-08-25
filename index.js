const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/key")
const { User } = require("./models/User");

mongoose.connect('config.mongoURI', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

const PORT = 3000;

const app = express();

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
 res.send("Hello World")        
})

app.post("/register", (req, res) => {
    // 회원가입을 위한 라우터
    // 회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이테베이스에 넣어준다.

    const user = new User(req.body)

    // mongoDB에서 오는 메소드
    user.save((err, useInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(PORT, () => {
 console.log(`🍀 ${PORT} Server Start With Express`)
})
