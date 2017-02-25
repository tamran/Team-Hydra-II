import home from './homeRoutes';
import experimentCreation from './experimentCreationRoutes';
import dataCollection from './dataCollectionRoutes';

export let route = (app) => {
    home(app);
    experimentCreation(app);
    dataCollection(app);
}
