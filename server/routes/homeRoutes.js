import path from 'path';

let homeRoutes = (app) => {
    app.route('/')
        .get((req,res) => {
            if (process.env.NODE_ENV === 'production') {
                res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
            } else {
                res.sendFile(path.resolve(__dirname, '../..', 'public-dev', 'index.dev.html'));
            }
        })
}

export default homeRoutes;
