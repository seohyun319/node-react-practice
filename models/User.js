const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)  //모델로 스키마 감싸줌

module.exports={User} // 다른 파일에서도 쓸 수 있도록 export 해줌