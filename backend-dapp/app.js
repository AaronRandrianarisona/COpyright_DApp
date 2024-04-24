const express = require('express');
const bodyParser = require('body-parser');
const { registerWork, grantRights, revokeRights } = require('./contractInteraction');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { title, description } = req.body;
    const success = await registerWork(title, description);
    if (success) {
        res.status(200).json({ message: 'Work registered successfully' });
    } else {
        res.status(500).json({ error: 'Error registering work' });
    }
});

app.post('/grant', async (req, res) => {
    const { title, userAddress } = req.body;
    const success = await grantRights(title, userAddress);
    if (success) {
        res.status(200).json({ message: 'Rights granted successfully' });
    } else {
        res.status(500).json({ error: 'Error granting rights' });
    }
});

app.post('/revoke', async (req, res) => {
    const { title, userAddress } = req.body;
    const success = await revokeRights(title, userAddress);
    if (success) {
        res.status(200).json({ message: 'Rights revoked successfully' });
    } else {
        res.status(500).json({ error: 'Error revoking rights' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
