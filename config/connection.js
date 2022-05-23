const {connect, connection} = require("mongooose");

const connectionString= process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

connect(connectionString,{
    newUrlParser:true,
    useUnifiedTopology:true
});

module.exports= connection;