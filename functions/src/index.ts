import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
const cors = require('cors');
const moment = require('moment');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
app.use(cors())
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);

const userCollection = 'user';

// Add new user
app.post('/users', (req, res) => {
    const now = moment().unix();
    // create unique user id
    const id = `user-${now}`;
    db.collection(userCollection).doc(id).set(req.body)
        .then(response => res.status(200).send(`USER CREATED - ${response}`))
        .catch(err => res.send(`CREATE USER FAILED - ${err}`))
})
// Update new user
app.patch('/users/:userId', (req, res) => {
    db.collection(userCollection).doc(req.params.dressId).update(req.body)
        .then(() => res.send('USER UPDATED'))
        .catch(err => res.send(`UPDATE USER FAILED - ${err}`))
})
// View a user
app.get('/users/:userId', (req, res) => {
    res.send('SINGLE USER VIEWED');
})
// View all users
app.get('/users', (req, res) => {
    let data = {};
    data[userCollection] = {};
    db.collection(userCollection).get().then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            data[userCollection][doc.id] = doc.data();
        });
        return res.status(200).send(data);
    }).catch(err => {
        res.send(`GET USERS FAILED - ${err}`);
    })
})
// Delete a user 
app.delete('/users/:userId', (req, res) => {
    res.send('USER DELETED');
})