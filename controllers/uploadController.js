const Post = require('../models/Publication')
const path = require('path')

exports.uploadPostCoverImage = (req, res, next) => {
    Post.findOneAndUpdate(
        {
            _id: req.params.id
        }, {
        $set: {
            coverImage: req.file.path,
        },
    }, {
        new: true
    }, (error, post) => {
        if (error) {
            return res.status(500).send(error)
        }
        const response = {
            message: "successfully added image",
            data: post
        };
        return res.status(200).send(response)
    }
    )
};