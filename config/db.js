const mongoose  = require('mongoose');
const {config} = require('dotenv')
config();
mongoose.connect(process.env.ATLAS_MONGOOSE_URL);