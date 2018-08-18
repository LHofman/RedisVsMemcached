const moment = require("moment");
const dateformat = require("dateformat");

const memcached = require("./memcached");
const redis = require("./redis");
const { getData, getDates } = require("./util");

const dates = getDates();
const data = dates
  .map(date => getData(date))
  .reduce((events, data) => [...events, ...data], []);
const ids = data.map(event => event.event_uid);

// printNow();
// redis.storeEventsAsEncodedList(data).then(() => {
//   redis.getEventsAsEncodedList().then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

// printNow();
// memcached.storeEventsAsEncodedList(data).then(() => {
//   memcached.getEventsAsEncodedList().then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

// printNow();
// redis.storeEventsAsObjects(data).then(() => {
//   redis.getEventsAsObjects(ids).then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

// printNow();
// memcached.storeEventsAsObjects(data).then(() => {
//   memcached.getEventsAsObjects(ids).then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

// printNow();
// redis.storeEventsAsEncodedObjects(data).then(() => {
//   redis.getEventsAsEncodedObjects(ids).then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

// printNow();
// memcached.storeEventsAsEncodedObjects(data).then(() => {
//   memcached.getEventsAsEncodedObjects(ids).then(events => {
//     printNow();
//     console.log(`found ${events.length} events`);
//   });
// });

function printNow() {
  const now = new Date();
  console.log(dateformat(now, `HH:m:ss:${now.getMilliseconds()}`));
}
