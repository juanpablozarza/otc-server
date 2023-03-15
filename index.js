const Gun = require('gun');
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const port = 3030;
app.get('/:state', async (req, res) => {
    try {
        const { state } = req.params;
        const auth = await google.auth.getClient({
            keyFile: './credentials-otc.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        });
        const sheets = google.sheets({
            version: "v4",
            auth: auth
        });
        const range = `Mexico!A${state}:D${state}`;
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: '1JNw1fLcav0HUD_802gwsN5EsfQK_P5Ti1RAfnqheIiw',
            range: range
        });
        res.status(200);
        res.send({
            data: response.data.values,
            ok: true
        });

    } catch (error) {
        res.status(305);
        res.send({
            error: error.toString()
        })

    }


});
app.use([Gun.serve, express.json({ limit: '50mb' }), cors()]);
const server = app.listen(process.env.PORT || port, () => {
    console.log(`App live at ${port}`);
})
Gun({ web: server });

