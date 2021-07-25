const https = require('https');
const {Buffer} = require('buffer');

module.exports.get = async function get( host) {
  return await new Promise( (resolve, reject) =>{  
    let data = []
    https.get(host, ( res ) => { 
       res.on( "data", d => data.push( d ) );
       res.on( "end", _ => resolve(Buffer.concat(data)));
       res.on( "error", e => reject(e));
    })
  })
}
