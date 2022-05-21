const express= require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Content = require('./models/content.model')
const { request } = require('express')
const { urlencoded } = require('express')
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
    Content.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'Anasayfa', contents: result} );
    })
    .catch((err)=>{console.log(err)})
  }); 
 


app.get('/content/:id', (req,res)=>{
    const id = req.params.id
    
    
    Content.findById(id)
    .then((result)=>{
        res.render('content',{content:result, title: 'detay'} );
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'Hata'})
    })
})


app.get('/admin',(req,res)=>{
    Content.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('admin',{title:'admin', contents: result} );
    })
    .catch((err)=>{console.log(err)})
})




app.get('/admin/add',(req,res)=>{
    res.render('add',{title:'Ekleme Sayfasi'})
})

app.post('/admin/add',(req,res)=>{
    const daire = new Content(req.body)

    daire.save()
    .then((result)=>{
        res.redirect('/admin' );
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.delete('/admin/delete/:id',(req,res)=>{
    const id = req.params.id

    Content.findByIdAndDelete(id)
        .then((result)=>{
            res.json({link:'/admin'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

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


