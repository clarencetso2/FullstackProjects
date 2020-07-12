const passport = require('passport');
module.exports= (app) =>{
  //express route handler
  app.get(
  		'/auth/google',
  		passport.authenticate('google',{
  		scope: ['profile', 'email']
  	})
  );

  //callback route handler.
  //Get more info from google
  //after user gives permission
  app.get(
  		'/auth/google/callback',
  		passport.authenticate('google'),
      (req,res)=>{
        res.redirect('/surveys');
      }
  );

  app.get('/api/logout', (req,res) =>{
    req.logout();
    res.redirect('/');
  });
  //return whoever is logged into application
  //take response, user can get access to user
  app.get('/api/current_user',(req,res) => {
        //req.user comes from cookie
        //cookieSession extractts data from cookie
        //and sends it to Passport to serialize/deserialize
        res.send(req.user);
  });
}
