require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyATYxVBlq1LXkiPM9ZvYhuwG-IGfrKT7o8"
destination = ["APA91bEj2ynaachQ0rue2lwvYs5fkn5iwslh3uZeJey1WHIBs82eA1x1s"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification( destination, data)