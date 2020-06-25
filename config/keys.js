//keys.js -figure out what set of credentials
//we need to use (production or development
if(process.env.NODE_ENV=== 'production'){
  //in production return prod key
  module.exports = require('./prod.js');
}
else{
  //we are in development return dev key
  module.exports = require('./dev.js');
}
