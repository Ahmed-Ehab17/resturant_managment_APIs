const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, origin);
        }else{
            callback(new Error("Not Allowed CORS"));
        }
    },
    Credential: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;