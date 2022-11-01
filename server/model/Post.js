
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type :String,
        minLen: 1,
        maxLen: 250,
        required: [true, "buglunuu"]
    },
    body: {
        type: String,
        required: [true, "Заавал бөглөнө үү"],
      },
    Image: {
        type: String,
    },
    author: {
        type: Schema.ObjectId,
        ref: "Users",
        required: true,
      },
})

const Post = model("Post", postSchema);

module.exports = Post;

