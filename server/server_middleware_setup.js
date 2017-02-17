import bodyParser from 'body-parser';

export const connectMiddleware = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
}
