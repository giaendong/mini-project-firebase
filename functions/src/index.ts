import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);


// Add new user
app.post('/users', (req, res) => {
    res.send('USER CREATED');
})
// Update new user
app.patch('/users/:userId', (req, res) => {
    res.send('USER UPDATED');
})
// View a user
app.get('/users/:userId', (req, res) => {
    res.send('SINGLE USER VIEWED');
})
// View all users
app.get('/users', (req, res) => {
    res.send('ALL USERS VIEWED');
})
// Delete a user 
app.delete('/users/:userId', (req, res) => {
    res.send('USER DELETED');
})