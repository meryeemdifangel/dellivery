var admin = require("firebase-admin");

var serviceAccount = require("./firebase_admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// const message = {
//     notification: {
//       title: 'Notification Title',
//       body: 'Notification Body',
//     },
//     token: 'cPoSI4ETSgWnokb3pBQqJc:APA91bGJA5rHIwVn7MgUcFocCN-xvY2hDBqMqruLo07SAiDLMNyHggXqwB98t21_E8bUHM8uVmM2TvKuxYQVe7-v8FAzKu8DrpGAxkD1kQEF02XvIZV20lJBGvKcRP1Nn4uzqsEpO22j',
//   };
  
//   admin.messaging().send(message)
//     .then((response) => {
//       console.log('Notification sent successfully:', response);
//     })
//     .catch((error) => {
//       console.error('Error sending notification:', error);
//     });
  

    module.exports = admin