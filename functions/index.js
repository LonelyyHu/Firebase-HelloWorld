const functions = require('firebase-functions')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

var db = admin.firestore()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    var docRef = db.collection('messages').doc()

    return docRef.set({
        original
    }).then((snapshot) => {
        res.send("Success")
        return "Success111"
    });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.firestore.document('messages/{message}').onCreate((snapshot, context) => {
        
    const data = snapshot.data()
    console.log('Uppercasing', context.params.message, data.original)

    const uppercase = data.original.toUpperCase()
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.update({
        uppercase
    })
});
