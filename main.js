var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKjoLBtYtUMhwopzqEpA5IibVbjpVSsYgEjb4dw9poocUsJKNi7kV1gfXhdSTPWmi3-ZGtx4m2BZYEcB4q_G_8I",
   "privateKey": "iJJo0QA45bpyBCQLyXDj21QCjWbet0Yaj4XrS2HACYw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cvjSlxzOTjE:APA91bERK_iVjosAJgOLmS8Zri7fLxV-Q3tSbYQwdzErpL80l0AZPEgE09AWBmhbZuSuI84O0tsLZUNkSGDyNU78-7csv7K-yZIYhl5EImt_A54aDjYtAgt9aPLt5RSFTYVu6AdpmOjU",
   "keys": {
       "p256dh": "BK9wkf4+PPbYGfuw3nmm1/hmwvVSURbTKruYQ7vMZUG0NhLvCvkvKzEpjedtX0Vp7eJv37fEvq73Jni0kecoCmM=",
       "auth": "Gmsw4dHw1RH8aoULiR6nDA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '<FCM Sender ID>',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);