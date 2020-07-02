module.exports = (req,res, next) =>{
  if(!req.user){
    //if user not logged in stop right here
    return res.status(401).send({error:'You must log in!'});
  }
  next();
};
