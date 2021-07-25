const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        maxlength: 50        
    },
    email: {
        type: String,
        trim: true, //빈칸 없애주는 역할
        unique: 1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role: {
        type: Number,
        default:0
    },
    image: String,
    token: {
        type:String
    },
    tokenExp: {
        type:Number
    }    
})

userSchema.pre('save', function(next) {//mongoose에서 가져온 메소드. user정보를 저장하기 전에 function 내용을 한다
    var user = this;
    
    //비밀번호를 암호화시킬 것
    if(user.isModified('password')){ //userSchema가 save될때마다 실행되는 게 아니라 password가 변경될 때 실행
        bcrypt.genSalt(saltRounds, function(err, salt){
            //bcrypt에서 salt를 만듦(genSalt). 에러나면 err, 성공하면 salt 실행
            if(err) return next(err) //에러나면 다음 err (index.js에서 register route에서 if(err) 부분) 실행
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password=hash //성공하면 user의 password를 hash(암호화)된 패스워드로 바꿈.
                next()
            })
        })
    }
})


const User = mongoose.model('User', userSchema)  //모델로 스키마 감싸줌

module.exports={User} // 다른 파일에서도 쓸 수 있도록 export 해줌