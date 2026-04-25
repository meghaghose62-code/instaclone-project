const express = require('express');
const multer = require('multer');
const uploadFile = require("./services/storage.service")
const postModel= require("./models/post.model")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());



const upload = multer({ storage: multer. memoryStorage()})



app.post('/create-post',upload.single("image"),async (req, res) => {



    const result = await uploadFile(req.file.buffer)

    const post = await postModel.create({
    image: result.url,
    caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post created successfully",
        post
    })

})


app.get("/posts", async (req, res) => {

    const posts = await postModel.find()

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
})


app.delete('/delete-post/:id', async (req, res) => {
    const post = await postModel.findByIdAndDelete(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    return res.status(200).json({
        message: "Post deleted successfully",
        post
    });
});

app.patch('/update-post/:id', async (req, res) => {
    const post = await postModel.findByIdAndUpdate(
        req.params.id,
        { caption: req.body.caption },
        { new: true }
    );

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    return res.status(200).json({
        message: "Post updated successfully",
        post
    });
});
module.exports = app;