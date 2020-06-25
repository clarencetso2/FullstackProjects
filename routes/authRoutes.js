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
  		passport.authenticate('google')
  );

  app.get('/api/logout', (req,res) =>{
    req.logout();
    res.send(req.user);
  });
  //return whoever is logged into application
  //take response, user can get access to user
  app.get('/api/current_user',(req,res) => {
        res.send(req.user);
  });
}
