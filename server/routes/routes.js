import home from './homeRoutes';
import experimentCreation from './experimentCreationRoutes';
import dataCollection from './dataCollectionRoutes';
import dataOrganization from './dataOrganizationRoutes';

export let route = (app) => {
    home(app);
    experimentCreation(app);
    dataCollection(app);
    dataOrganization(app);
}
