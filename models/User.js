const mongoose = require("mongoose");

// model안에 schema를 감싸준다.

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // trim : 이메일 주소의 빈칸을 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    // role : 관리자인지 아닌지 확인하기 위해 
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
    // tokenExp : 토큰 유효기간
})

const User = mongoose.model("User", userSchema)
// User라는 모델안에 userSchema라는 스키마를 넣어준다.

module.exports = { User }