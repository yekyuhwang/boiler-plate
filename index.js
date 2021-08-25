const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
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
app.use(cookieParser())

app.get("/", (req, res) => {
 res.send("Hello World")        
})

app.post("/api/users/register", (req, res) => {
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

app.post("/api/users/login", (req, res) => {

    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    })

    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    })

    // 3. 비밀번호까지 맞다면 토큰을 생성한다.
    user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // token을 저장한다. 어디에 ? 
        // 쿠키, 로컬스토리지.. 여러가지 방법이 있다.
           res.cookie("x_auth", user.token) 
           .status(200)
           .json({ loginSuccess: true, userId: user._id })
    })
})

// auth : 미들웨어
app.get("/api/users/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get("/api/users/logout", auth, (req, res) => {
    User.findOneAndUpdate({_id:req.user._id}, // 미들웨어에서 가져옴
        {token: ""}, (err, user) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})

app.listen(PORT, () => {
 console.log(`🍀 ${PORT} Server Start With Express`)
})
