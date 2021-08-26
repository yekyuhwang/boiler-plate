const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10
var jwt = require('jsonwebtoken');

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

userSchema.pre("save", function( next ) {
    var user = this;

    if(user.isModified("password")) {
    // 비밀번호를 암호화 시킨다.

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            // hash : 암호화된 비밀번호
            if(err) return next(err)
            user.password = hash
            next()
        });
    });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch) // 비밀번호는 같다 true
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
     // jsonwebtoken을 이용해서 token을 생성하기 
     var token = jwt.sign(user._id.toHexString(), 'secretToken');

    //  user._id + 'secretToken' = token

    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user) 
    })
}

userSchema.statics.findByToken = function ( token, cb ) {
    var user = this;

    // 토큰을 decode한다.

    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 토큰과 디비에 보관된 토큰이 일치하는 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model("User", userSchema)
// User라는 모델안에 userSchema라는 스키마를 넣어준다.

module.exports = { User }