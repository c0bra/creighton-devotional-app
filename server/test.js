var Kaiseki = require('kaiseki');

var kaiseki = new Kaiseki("iLrmrcP2Jr9kuwcQ4zJKj412OVbhmjExkeVumuVn", "O4EtNLLCSuKCrn7ISTYCRoyPNh2iK2KeO2mgBY3S");

var blah = {
  name: 'Bob',
  age: 50
}

// kaiseki.createObject('Blahs', blah, function (err, res, body, success){

// });

var b = kaiseki.getObjects('Blahs', function (err, res, body, success){
  console.log(body);
});