const CustomPost = require('../models/customPost'),
      Counter = require('../models/counter'),
      CustomPostType = require('../models/customPostType');

module.exports = {
    create(req, res, next){
        const customPostProps = req.body;
        Promise.all([Counter.findOne({}), CustomPostType.findOne({type: customPostProps.type})])
            .then((response) => {
                customPostProps.id = response[0].counter;
                const postType = response[1];
                if(postType !== null){
                    const newCustomPost = new CustomPost(customPostProps);

                    newCustomPost.save()
                        .then((response) => {
                            postType.update({$push: {posts: response._id}})
                                .catch(next);
                        })
                        .then(() => {
                            res.send("Custom post saved successfully");
                        })
                        .catch(next);

                } else {
                    res.status(422).send({error: "There is no " + customPostProps.type + " post type."})
                }
            })
            .catch(next);
    }
};