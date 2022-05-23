const jsonwebtoken = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken')
const User = require('../models/user')
const maxAge = 60*60*24

const createToken = (id) =>{
    return jsonwebtoken.sign({id}, 'secret-key', {expiresIn: maxAge})
}

const login_Get = (req,res) =>{
    res.render('login', {title : "Giris"})
}

const login_Post = async (req,res) => {
    const {username , password } = req.body
    try{
        const user = await User.login(username,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly:true, maxAge : maxAge* 1000})
        res.redirect('/admin')
    }
    catch(e){
        console.log(e)
    }
}

const signup_Get = (req,res) =>{
    res.render('signup', {title : "Kayit"})
}
const signup_Post = (req,res) =>{
    const user = new User(req.body)
    user.save()
        .then((result)=>{
            res.redirect('/login')
        })
        .catch((err)=>{
            console.log(err)
        })
}

const logout_Get = (req,res) =>{
    res.cookie('jwt','',{maxAge:1} )
    res.redirect('/login')
}

module.exports = {
    login_Get,
    login_Post,
    signup_Get,
    signup_Post,
    logout_Get
}