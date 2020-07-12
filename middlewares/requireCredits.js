module.exports = (req,res, next) =>{
  console.log("require credits");
  console.log(req.user.credits);
  if(req.user.credits <1){
    //if user not enough credits
    return res.status(403).send({error:'Not enough credits!'});
  }
  next();
};
