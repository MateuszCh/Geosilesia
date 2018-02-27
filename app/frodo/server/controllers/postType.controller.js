const PostType = require('../models/postType'),
      Component = require('../models/component'),
      mongoose = require('mongoose'),
      Counter = require('../models/counter'),
      format = require('../models/tools/format');

module.exports = {
    create(req, res, next){
        const path = req.route.path;
        let Model;
        const isComponent = path.indexOf('component') >= 0;
        isComponent ? Model = Component : Model = PostType;
        const postTypeProps = req.body;

        postTypeProps.type = format.formatId(postTypeProps.type);

        Model.findOne({type: postTypeProps.type})
            .then(existingType => {
                if(existingType === null){
                    Counter.findOne({})
                        .then(counter => {
                            postTypeProps.id = counter.counter;
                            Model.create(postTypeProps)
                                .then(() => {
                                    res.send(`${isComponent ? 'Component' : 'Post'} type created successfully`);
                                    Counter.update(counter, { $inc: {counter: 1}})
                                        .then(() => console.log("Counter incremented"))
                                        .catch(next)
                                })
                                .catch(next);
                        })
                        .catch(next);
                } else {
                    res.status(422).send({error: `There already is "${postTypeProps.type}" type`})
                }
            })
            .catch(next);
    },
    edit(req, res, next){
        const path = req.route.path;
        let Model;
        const isComponent = path.indexOf('component') >= 0;
        isComponent ? Model = Component : Model = PostType;
        const postTypeProps = req.body;
        postTypeProps.type = format.formatId(postTypeProps.type);

        const id = mongoose.Types.ObjectId(postTypeProps._id);

        Model.findOne({type: postTypeProps.type, _id : {$ne: id}})
            .then(existingType => {
                if(existingType === null){
                    Model.findById(postTypeProps._id)
                        .then((post) => {

                            post.type = postTypeProps.type;
                            post.title = postTypeProps.title;
                            post.fields = postTypeProps.fields;
                            post.pluralTitle = postTypeProps.pluralTitle;

                            post.save()
                                .then(post => res.send(post))
                                .catch(next)
                        })
                        .catch(next);
                } else {
                    res.status(422).send({error: `There already is "${postTypeProps.type}" type`});
                }
            })
            .catch(next)
    },
    getAll(req, res, next){
        const path = req.route.path;
        let Model;
        const isComponent = path.indexOf('component') >= 0;
        isComponent ? Model = Component : Model = PostType;
        Model.find({})
            .then(postTypes => res.send(postTypes))
            .catch(next);
    },
    getById(req, res, next){
        const path = req.route.path;
        let Model;
        const isComponent = path.indexOf('component') >= 0;
        isComponent ? Model = Component : Model = PostType;
        Model.findOne({id: req.params.id})
            .then(postType => res.send(postType))
            .catch(next);
    },
    getByIdWithPosts(req, res, next){
        PostType.findOne({id: req.params.id})
            .populate('posts')
            .then(postType => res.send(postType))
            .catch(next);
    },
    getByType(req, res, next){
        PostType.findOne({type: req.params.type})
            .then(postType => res.send(postType))
            .catch(next);
    },
    getByTypeWithPosts(req, res, next){
        PostType.findOne({type: req.params.type})
            .populate('posts')
            .then(postType => res.send(postType))
            .catch(next);
    },
    delete(req, res, next){
        const path = req.route.path;
        let Model;
        const isComponent = path.indexOf('component') >= 0;
        isComponent ? Model = Component : Model = PostType;
        Model.findById(req.params.id)
            .then(postToRemove => {
                postToRemove.remove()
                    .then(postType => res.status(200).send(`${postType.type} type removed successfully`))
                    .catch(next);
            })
            .catch(next);
    }
};