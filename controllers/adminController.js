const Content = require('../models/content.model')

const admin_index = (req,res)=>{
    Content.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('admin',{title:'admin', contents: result} );
    })
    .catch((err)=>{console.log(err)})
}


const admin_add = (req,res)=>{
    res.render('add',{title:'Ekleme Sayfasi'})
}

const admin_add_post = (req,res)=>{
    const daire = new Content(req.body)

    daire.save()
    .then((result)=>{
        res.redirect('/admin' );
    })
    .catch((err)=>{
        console.log(err)
    })
}

const admin_delete = (req,res)=>{
    const id = req.params.id

    Content.findByIdAndDelete(id)
        .then((result)=>{
            res.json({link:'/admin'})
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = {
    admin_index,
    admin_add,
    admin_add_post,
    admin_delete
}