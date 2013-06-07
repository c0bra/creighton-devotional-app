var gcm = require('node-gcm');

var message = new gcm.Message();

var sender = new gcm.Sender('AIzaSyATYxVBlq1LXkiPM9ZvYhuwG-IGfrKT7o8');

message.addDataWithObject({
  message: 'I am awesome'
});

var registrationIds = [];
registrationIds.push("APA91bEj2ynaachQ0rue2IwvYsS_-5Fkn5Fiwslh3uZeJEy1WHIBs82eA1Xl87OM95VUy8kEhKFhdjwld0lc3bRMrVL4nbzBJed2qEU4PHZT7bfSU92nyTAc_Zyl6xog0klnki_5tAjoUsAtEJHAoMPKReT0SAPwsA");

sender.send(message, registrationIds, 4, function(err, result) {
  if (err) { console.log("Error: " + err); }
  console.log(result);
});