/* eslint linebreak-style: off, eol-last: off, indent: off, prefer-destructuring: off, no-bitwise: off, max-len: off */

const yargs = require('yargs');
const moment = require('moment-timezone');

// get list of all timezones and countries from moment
const timeZones = moment.tz.names();
const countries = moment.tz.countries();

// get flag argument booleans from yargs object
const format = Object.prototype.hasOwnProperty.call(yargs.argv, 'format');
const all = Object.prototype.hasOwnProperty.call(yargs.argv, 'all');
const country = Object.prototype.hasOwnProperty.call(yargs.argv, 'country');

// define exit function
function exitProcess(exitcode) {
    if (exitcode !== 0) { console.log('Usage: node tz [--all] <timezone / 2-letter country code> [--country] [--format]'); }
    process.exit(exitcode);
}

// timezone name format function
function tzNameFormat(name) {
    let str = name.split('/');
    if (str.length > 1) { str = str[1]; }
    return str.toString().replace('_', ' ');
}

// function to convert a list of tz names to zone objects that include the zone's current time
function tzNamesToZones(timezones) {
    let timeZoneObjects;
    if (format) {
        timeZoneObjects = timezones.map((name) => {
            const now = moment.tz(name);
            return {
              name,
              current_time: now.format('dddd, MMMM Do YYYY, h:mm:ss a'),
            };
          });
    } else {
        timeZoneObjects = timezones.map((name) => {
            const now = moment.tz(name);
            return {
              name,
              current_time: now.format(),
            };
          });
    }
    return timeZoneObjects;
}

// exit early with code 1 if 'all' flag is not flipped and no base argument is found (and vice versa)
if ((!all & yargs.argv._.length === 0) || (all && yargs.argv._.length > 0)) {
    exitProcess(1);
}

// set defaultTimezone as New York
const defaultTimezone = 'America/New_York';
// set target as first argument
const target = yargs.argv._[0];

// exit early with code 2 if target is not a timezone or a country
if (!all && ((!country && !timeZones.includes(target)) || (country && !countries.includes(target)))) {
    exitProcess(2);
}

// if one flag is flipped
if (all ^ country) {
    if (all) {
        // display table of all timezones
        console.table(tzNamesToZones(timeZones));
        // exit with code 0 (success)
        exitProcess(0);
    }

    if (country) {
        // get timezones from country
        const countryZones = moment.tz.zonesForCountry(target);
        // show table of all timezones for target country
        console.table(tzNamesToZones(countryZones));
        // exit with code 0 (success)
        exitProcess(0);
    }
} else {
    // if no flags are flipped
    if (!all && !country) {
        if (format) {
            // prepare formatted strings
            const formattedDefaultTime = moment().tz(defaultTimezone).format('dddd, MMMM Do YYYY, h:mm:ss a');
            const formattedTime = moment().tz(target).format('dddd, MMMM Do YYYY, h:mm:ss a');
            console.log(`The time here is: ${formattedDefaultTime}`);
            console.log(`The time in ${tzNameFormat(target)} is: ${formattedTime}`);
            // exit with code 0 (success)
            exitProcess(0);
        }
        console.log(`The time here is: ${moment().tz(defaultTimezone).format()}`);
        console.log(`The time in ${tzNameFormat(target)} is: ${moment().tz(target).format()}`);
        // exit with code 0 (success)
        exitProcess(0);
    }
    // assuming more than one flag is flipped
    exitProcess(3);
}