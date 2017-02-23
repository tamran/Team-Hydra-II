import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

export const connectMiddleware = (app) => {
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.resolve(__dirname, '..', 'build')));
    } else {
        app.use(express.static(path.resolve(__dirname, '..', 'public-dev/js')));
    }
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json())
}
