const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');

const gqlurl = "http://localhost:4000/";

app.use(express.json());

app.post('/transaction', (req, res) => {

    let transaction = req.body;

    axios({
        url: gqlurl,
        method: 'post',
        data: {
            query: `
                mutation Mutation($transaction: TransactionInput! ) {
                    addTransaction(transaction: $transaction) {
                    success
                    message
                    }
                }
            `,
            variables: {
                transaction: transaction
            }
        }
    }).then(resp => {
        res.json(resp.data);
    }).catch(err => {
        res.status(err.response.status).json({ error: err.response.statusText });
    })
})

app.listen(port, () => {
    console.log(`REST app listening on port ${port}`);
})