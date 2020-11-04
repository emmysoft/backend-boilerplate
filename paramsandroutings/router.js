const express = require('express');
const router = express.Router();
//implementations
router.param('postId', (req, res, next) => {
    req.post = {
        name: 'PHP vs Node.js',
        url: 'http://www.emmysoft.io'
    };
    return next();
});

router
    .route('/posts/:postId')
    .all( (req, res, next) => {
        //
    })
    .post((req, res, next) => {

    })
    .get((req, res, next) => {
        res.json(req.post);
    })
    .put((req, res, next) => {
        res.json(req.post)
    })
    .delete((req, res, next) => {
        res.json({'message': 'ok'});
    })