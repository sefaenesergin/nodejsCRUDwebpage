const Content = require('../models/content.model')
 

const content_index = (req,res)=>{
    Content.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{title:'Anasayfa', contents: result} );
    })
    .catch((err)=>{console.log(err)})
}

const content_detailed = (req,res)=>{
    const id = req.params.id
    
    
    Content.findById(id)
    .then((result)=>{
        res.render('content',{content:result, title: 'detay'} );
    })
    .catch((err)=>{
        res.status(404).render('404',{title:'Hata'})
    })
}

module.exports = {
    content_index,
    content_detailed
}