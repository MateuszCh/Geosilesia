const Page = require('../models/page'),
      Counter = require('../models/counter'),
      mongoose = require('mongoose');

module.exports = {
    create(req, res, next){
        const pageProps = req.body;
        Page.findOne({pageUrl: pageProps.pageUrl})
            .then(existingPage => {
                if(existingPage === null){
                    Counter.findOne({})
                        .then(counter => {
                            pageProps.id = counter.counter;
                            Page.create(pageProps)
                                .then(() => {
                                    res.send("New page created successfully");
                                    Counter.update(counter, {$inc: {counter: 1}})
                                        .then(() => console.log("Counter incremented"))
                                        .catch(next);
                                })
                                .catch(next);
                        })
                        .catch(next);
                } else {
                    res.status(422).send({error: `There already is page with "${pageProps.pageUrl}" url.`})
                }
            })
            .catch(next);
    },
    edit(req, res, next){
        const pageProps = req.body;
        const id = mongoose.Types.ObjectId(pageProps._id);

        Page.findOne({pageUrl: pageProps.pageUrl, _id : {$ne: id}})
            .then(existingPage => {
                if(existingPage === null){
                    Page.findById(pageProps._id)
                        .then(page => {
                            page.title = pageProps.title;
                            page.pageUrl = pageProps.pageUrl;
                            page.rows = pageProps.rows;

                            page.save()
                                .then(page => res.send(page))
                                .catch(next);
                        })
                } else {
                    res.status(422).send({error: `There already is page with "${pageProps.pageUrl}" url.`});
                }
            })
            .catch(next);
    },
    getAll(req, res, next){
        Page.find({})
            .then(pages => res.send(pages))
            .catch(next);
    },
    getById(req, res, next){
        Page.findOne({id: req.params.id})
            .then(page => res.send(page))
            .catch(next);
    },
    delete(req, res, next){
        Page.findByIdAndRemove(req.params.id)
            .then(() => res.status(200).send("Page removed successfully"))
            .catch(next);

    }
};
