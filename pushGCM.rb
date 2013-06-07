require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyATYxVBlq1LXkiPM9ZvYhuwG-IGfrKT7o8"
destination = ["APA91bEj2ynaachQ0rue2IwvYsS_-5Fkn5Fiwslh3uZeJEy1WHIBs82eA1Xl87OM95VUy8kEhKFhdjwld0lc3bRMrVL4nbzBJed2qEU4PHZT7bfSU92nyTAc_Zyl6xog0klnki_5tAjoUsAtEJHAoMPKReT0SAPwsA"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification( destination, data)