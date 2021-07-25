const express = require('express') //express 모듈 가져옴
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended:true}));
//application/x-www-form-urlencoded 가져옴

app.use(bodyParser.json());
//application/json 가져옴

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요! 반가워요!')
})

app.post('/register', (req, res) => { //라우트에 엔드 포인트는 register. 
    //콜백펑션을 request, response
    //회원가입할 때 필요한 정보들을 client에서 가져오면 그것들을 DB에 넣어준다

    const user = new User(req.body)  //bodyParser을 이용해 req.body로 받아올 수 있는 것. 
    user.save((err, userInfo) => {
        if(err) return res.json({success:false, err}) //에러나면 success:false랑 에러메시지 
        return res.status(200).json({ //status 200은 성공한 것
            success:true
        })
    })
})

app.post('/login', (req, res) => {
  //1. 데이터베이스에서 요청한 email 찾기:
  User.findOne({email:req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess:false, 
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    
    //2. 데이터베이스에서 요청한 email이 있다면 비밀번호가 같은지 확인:
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
      
      //3. 비밀번호까지 같다면 token을 생성
      user.generateToken((err,user) => {

      })

    } )
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})