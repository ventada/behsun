const localStrategy =require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const User = require('../model/User')


module.exports = (passport)=>{
    passport.use(new localStrategy(
        {passReqToCallback:true}
        ,
        async (req,username,password,done)=>{

          //  do the custome error handling in the middleware
         
            const user = await User.findOne({username:username})
            if (!user) {
                req.flash("error",'ورود نا معتبر')
               return done(null,false)
            }
          const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          req.flash("error", "ورود نا معتبر");
          return done(null, false);
        }
        req.flash("success", "ورود با موفقیت انجام شد");
        done(null, user);
        }

        ))

        passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}