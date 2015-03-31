var net = require('net');
var fs = require('fs');
var server = net.createServer();
var meetups = JSON.parse(fs.readFileSync('./hipster_meetup.json'));

server.on('connection', function(client) {
  console.log('client connected');
  client.write("Welcome to Hipster Meetup!\nType \'help\' for a list of available commands. \n");
  client.write("\n");
  client.setEncoding('utf8');

  client.on('data', function(stringFromClient) {
    var splitInput = stringFromClient.trim().split("|")

    if (splitInput[0] === "admin"){
      //checks whether an admin is trying to use the app
      if (splitInput[1] === "1"){ //P@s$w0rd
        // checks whether the admin has put in the correct password -- begin admin features if password is correct
        var command = splitInput[2];
        switch (command){

          case 'list':
            // console.log(meetups[0].attendees);
            if (!meetups.attendees){
              client.write("There are no attendees for the upcoming meetup. \n")
            } else{
              meetups.attendees.forEach(function(attendee){
              client.write(attendee.name + ": " + attendee.email + "\n");
            })
            client.end();  
            }
            
          break;

          case 'meetup':
            var topic = splitInput[5];
            var date = splitInput[3];
            var time = splitInput[4];
            meetups.topic = topic;
            meetups.date = date;
            meetups.time = time;
            fs.writeFile('./hipster_meetup.json', JSON.stringify(meetups), "utf8");
            client.write("You have successfully added " + topic + " at " + time + " on " + date + "!\n");
            client.end();
          break;

          case 'clear':
            fs.writeFile('./hipster_meetup.json', "{}", "utf8");
            client.write("You have cleared all previous meetups! Please add a new meetup. \n");
            client.end();
          break;

          default:
            client.write("You typed an invalid command. \n");
        }

      } else {
        client.write("You have entered an incorrect password. Please try again. \n");
        client.end();
      }
    } else {
      //begin regular user features
      var command = splitInput[0];
      switch (command){

        case 'list':
          client.write("The next Hipster Meetup is: " + meetups.topic + " at " + meetups.time + " on " + meetups.date + "\n");
          client.end();
        break;

        case 'headcount':
          if (!meetups.attendees){
            client.write("No hipsters have RSPV\'d for the next meetup. You could be the first! \n");
          } else {
            client.write("There are currently " + meetups.attendees.length + " hipsters confirmed for the next Hipster Meetup. \n")  
          }
          client.end();
        break;

        case 'RSVP':
          meetups.attendees.push({name: splitInput[1], email: splitInput[2]});
          fs.writeFile('./hipster_meetup.json', JSON.stringify(meetups), "utf8");
          client.write("Thanks, " + splitInput[1] + "! You have successfully RSVP\'d to the next Hipster Meetup!\n");
          client.end();
        break;

        case 'help':
        client.write("Help menu. Here are the available commands:\n \'list\' -- Displays the details for the upcoming Hipster Meetup \n \'headcount\' -- Displays the number of confirmed hipsters for the next meetup \n \'RSVP\' -- RSVP for the upcoming Hipster Meetup! (Put in your info like this: \'RSVP|{full name|{email address}\'')\n")
        client.end();

        default:
          client.write("You typed an invalid command. Type \'help\' for a list of available inputs.\n")
          client.end();
      }
    }
  });
});

server.listen(8124, function() {
  console.log('Listening on port 8124');
});