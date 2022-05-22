const express= require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { request } = require('express')
const { urlencoded } = require('express')
const adminRoutes = require('./routes/adminRoutes')
const contentRoutes = require('./routes/contentRoutes')

const app = express()

const dbURL = 'mongodb+srv://ahmet07:asd123@cluster0.iwdpt.mongodb.net/node-project?retryWrites=true&w=majority' 
mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>{console.log(err)})



app.set('view engine', 'ejs');




app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //true dendiğinde iç içe nesne gönderme imkanı olur. false denirse olmaz.
app.use(morgan('tiny'))



app.get('/', function(req, res) {
    res.redirect('/content')
  }); 
  

app.use('/admin',adminRoutes)
app.use('/content',contentRoutes)


app.get('/about',(req,res)=>{
    res.render('about',{title:'Hakkımızda'})
})


app.get('/login',(req,res)=>{
    res.render('login',{title:"Giris"})
})

//use ile yazılan metotlar senkron çalışır. bu yüzden arkasından gelen kod bloğunu engeller. bu yüzden 
//use metodu en alta yazılır.
app.use((req,res)=>{
    res.status(404).render('404',{title:'Hata'})
})

