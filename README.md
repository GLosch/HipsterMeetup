#Hipster Meetup

###Features

> Admin Features

- the Admin can list all attendees for the upcoming meetup
```bash
admin|{password}|list
Attendees:
'beardydev@code4lyfe.com Frank Beardson'
'hoodies@hackers.net Evan McHoodie'
```

- the Admin can create a new meetup
```bash
admin|{password}|meetup|4/19/15|9:00pm|The Dao of Div
You have successfully added The Dao of Div at 9:00pm on 4/19/15!
```

- the Admin can clear the list of previous meetups
```bash
admin|{password}|clear
Previous meetups have been cleared!
```

>Standard User features

- User can display all upcoming meetups
```bash
list
'Upcoming meetup: 4/12/15 8:00pm Beards, Beer, and Booleans.'
```

- User can see how many people are RSVP'd for the upcoming event
```bash
headcount
'Upcoming meetup currently has 27 confirmed attendees'
```

- User can RSVP to the upcoming meetup
```bash
RSVP|Frank Beardson|beardydev@code4lyfe.com
Your RSVP has been confirmed for the upcoming meetup!
```
