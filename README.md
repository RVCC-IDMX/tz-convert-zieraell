# Timezone Converter App

This node app allows you to view the current time in various timezones compared to your current time!

To view the syntax of the app, run `node tz`
```
Usage: node tz [--all] <timezone / 2-letter country code> [--country] [--format]
```

To view the current time for a specific city, run `node tz [country]/[city]`
```
$ node tz America/New_York
The time here is: 2023-10-25T21:02:20-04:00
The time in New York is: 2023-10-25T21:02:20-04:00
```

To view the current times for every timezone in a specific country, run `node tz [2-letter country code] --country`
```
$ node tz US --country
┌─────────┬──────────────────────────────────┬─────────────────────────────┐
│ (index) │               name               │        current_time         │
├─────────┼──────────────────────────────────┼─────────────────────────────┤
│    0    │          'America/Adak'          │ '2023-10-25T15:45:47-09:00' │
│    1    │       'America/Anchorage'        │ '2023-10-25T16:45:47-08:00' │
│    2    │         'America/Boise'          │ '2023-10-25T18:45:47-06:00' │
│    3    │        'America/Chicago'         │ '2023-10-25T19:45:47-05:00' │
│    4    │         'America/Denver'         │ '2023-10-25T18:45:47-06:00' │
│    5    │        'America/Detroit'         │ '2023-10-25T20:45:47-04:00' │
│    6    │  'America/Indiana/Indianapolis'  │ '2023-10-25T20:45:47-04:00' │
│    7    │      'America/Indiana/Knox'      │ '2023-10-25T19:45:47-05:00' │
```

To view the current time for every timezone in the world, run `node tz --all` :)

## Formatting

If you would like the listed times to be formatted nicely, add the `--format` flag to the end of any of the commands!
```
$ node tz Australia/Melbourne --format
The time here is: Wednesday, October 25th 2023, 9:05:58 pm
The time in Melbourne is: Thursday, October 26th 2023, 12:05:58 pm
```
```
$ node tz AX --country --format
┌─────────┬────────────────────┬───────────────────────────────────────────┐
│ (index) │        name        │               current_time                │
├─────────┼────────────────────┼───────────────────────────────────────────┤
│    0    │ 'Europe/Helsinki'  │ 'Thursday, October 26th 2023, 4:09:10 am' │
│    1    │ 'Europe/Mariehamn' │ 'Thursday, October 26th 2023, 4:09:10 am' │
└─────────┴────────────────────┴───────────────────────────────────────────┘
```
