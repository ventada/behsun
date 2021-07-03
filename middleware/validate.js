exports.validateLogin= (req,res,next)=>{
    if(!req.body.username || !req.body.password){
          req.flash("error",'ورود نا معتبر')
               return res.redirect('/login')
    }
    return next()
  }
exports.validateRegister= (req,res,next)=>{
    if(!req.body.username || !req.body.password || !req.body.password2){
          req.flash("error",'ورود نا معتبر')
               return res.redirect('/register')
    }
    return next()
  }
