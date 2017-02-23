import React from 'react';

const App = ({ params }) => (
    <div>
        <h1>Welcome to Team Hydra II! Navigate to /trials to list all trial names. Navigate to trial/:trialName to get the data associated with the :trialName experiment {params.filter}</h1>
    </div>
);

export default App;
