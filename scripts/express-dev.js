const path = require('path');
const express = require('express');

const customServer = require(path.resolve('./lib/server/')).default;

const app = express();

customServer(app);

app.listen(3002, () => {
    // eslint-disable-next-line no-console
    console.log('Yay, local server started');
});
