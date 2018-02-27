const Post = require('../models/post'),
      Counter = require('../models/counter'),
      PostType = require('../models/postType');

module.exports = {
    create(req, res, next){
        const postProps = req.body;
        Promise.all([Counter.findOne({}), PostType.findOne({type: postProps.type})])
            .then(response => {
                const counter = response[0];
                postProps.id = counter.counter;
                const postType = response[1];
                if(postType !== null){
                    const newPost = new Post(postProps);
                    newPost.save()
                        .then(response => {
                            postType.update({$push: {posts: response._id}})
                                .then(() => {
                                    res.send("Post created successfully");
                                    Counter.update(counter, { $inc: {counter: 1}})
                                        .then(() => console.log("Counter incremented"))
                                        .catch(next)
                                })
                                .catch(next);
                        })
                        .catch(next);
                } else {
                    res.status(422).send({error: "There is no " + postProps.type + " post type."})
                }
            })
            .catch(next);
    },
    edit(req, res, next){
        const postProps = req.body;
        Post.findById(postProps._id)
            .then(post => {
                post.title = postProps.title;
                post.data = postProps.data;

                post.save()
                    .then(post => res.send(post))
                    .catch(next);
            })
            .catch(next);
    },
    getById(req, res, next){
        Post.findOne({id: req.params.id})
            .then(post => res.send(post))
            .catch(next);
    },
    delete(req, res, next){
        Post.findById(req.params.id)
            .then(postToRemove => {
                postToRemove.remove()
                    .then(() => {
                        PostType.update({type: postToRemove.type}, {$pull: {posts: postToRemove._id}})
                                .then(() => res.status(200).send("Post removed successfully"))
                    })
                    .catch(next);
            })
            .catch(next);
    }
};