app.param('v3Username', (req, _res, next, username) => {
    console.log(
        'Username param is detected: ',
        username
    )
    finduserByUsername(
        username,
        (error, user) => {
            if (error) return next(error);
            req.user = user;
            return next();
        }
    );
});

app.get('/v3/users/:v3Username',
    (req, res, _next) => {
        return res.render('user', req.user);
    });

app.get('/v3/admin/:v3Username',
    (req, res, _next) => {
        return res.render('admin', req.user);
    });

//implementing username and id with ROUTER
    router.param('username', (req, _res, next, username) => {
        console.log(
            'Username param is detected: ',
            username
        )
        finduserByUsername(
            username,
            (error, user) => {
                if (error) return next(error);
                req.user = user;
                return next();
            }
        );
    });
    
    router.get('/users/:username',
        (req, res, _next) => {
            return res.render('user', req.user);
        });
    
    router.get('/admin/:username',
        (req, res, _next) => {
            return res.render('admin', req.user);
        });

    app.use('/v4', router);