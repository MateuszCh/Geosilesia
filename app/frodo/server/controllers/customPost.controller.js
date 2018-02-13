const CustomPost = require('../models/customPost'),
      Counter = require('../models/counter'),
      CustomPostType = require('../models/customPostType');

module.exports = {
    create(req, res, next){
        const customPostProps = req.body;
        Promise.all([Counter.findOne({}), CustomPostType.findOne({type: customPostProps.type})])
            .then((response) => {
                const counter = response[0]
                customPostProps.id = counter.counter;
                const postType = response[1];
                if(postType !== null){
                    const newCustomPost = new CustomPost(customPostProps);

                    newCustomPost.save()
                        .then((response) => {
                            postType.update({$push: {posts: response._id}})
                                .then(() => {
                                    res.send("Custom post created successfully");
                                    Counter.update(counter, { $inc: {counter: 1}})
                                        .then(() => {
                                            console.log("Counter incremented");
                                        })
                                        .catch(next)
                                })
                                .catch(next);
                        })
                        .catch(next);

                } else {
                    res.status(422).send({error: "There is no " + customPostProps.type + " post type."})
                }
            })
            .catch(next);
    },
    delete(req, res, next){
        const customPostId = req.params.id;

        CustomPost.findById(customPostId)
            .then((postToRemove) => {
                postToRemove.remove()
                    .then(() => {
                        CustomPostType.update({type: postToRemove.type},
                            {$pull: {posts: postToRemove._id}})
                                    .then((updated) => {
                                        console.log(updated);
                                        res.send("Custom post removed successfully");
                                    })

                    })
                    .catch(next);
            })
            .catch(next);
    },
    getById(req, res, next){
        const customPostId = req.params.id;

        CustomPost.findOne({id: customPostId})
            .then((customPost) => {
                res.send(customPost);
            })
            .catch(next);
    },
    edit(req, res, next){
        const customPostId = req.params.id;
        const customPostProps = req.body;


        CustomPost.findById(customPostId)
            .then((customPost) => {
               customPost.title = customPostProps.title;
               customPost.data = customPostProps.data;

               customPost.save()
                   .then((customPost) => {
                       res.send(customPost);
                   })
                   .catch(next);
            })
            .catch(next);
    }
};