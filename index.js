const Gun = require('gun');
const express = require('express');

const app = express();
const port = 3030;

app.use(Gun.serve);
const server = app.listen( process.env.PORT || port, () => {
    console.log(`App live at ${port}`);
})
Gun({ web: server })