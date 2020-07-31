const mongoose = require("mongoose");
const schema = mongoose.Schema;
const postSchema = new schema({
    user_ref_id: {type: String},
    image_url: {type: String},
    text: {type: String},
    tags: [{
        type:String
    }]
},{ timestamps: true }
)


module.exports = mongoose.model("Post", postSchema);