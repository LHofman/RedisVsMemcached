const memcached = require('./memcached');

module.exports.set = function(key, value) {
    return memcached.set(key, value);
}
module.exports.get = function(key) {
    return memcached.get(key);
}

module.exports.removeKey = function(key) {
    return memcached.del(key);
}

module.exports.storeEventsAsEncodedList = function (data){
    return memcached.set('eventsAsEncodedListMemcached', JSON.stringify(data));
}
module.exports.getEventsAsEncodedList = function (){
    return memcached.get('eventsAsEncodedListMemcached').then(events => JSON.parse(events));
}

module.exports.storeEventsAsObjects = function (data){
    return Promise.all(data.map(event => memcached.set(`eventAsObjectMemcached:${event.event_uid}`, JSON.stringify(event))));
}
module.exports.getEventsAsObjects = function (ids){
    return Promise.all(ids.map(id => memcached.get(`eventAsObjectMemcached:${id}`))).then(events => events.map(JSON.parse));
}

module.exports.storeEventsAsEncodedObjects = function (data){
    return Promise.all(data.map(event => memcached.set(`eventsAsEncodedObjectMemcached:${event.event_uid}`, JSON.stringify(event))));
}
module.exports.getEventsAsEncodedObjects = function (ids){
    return Promise.all(ids.map(id => memcached.get(`eventsAsEncodedObjectMemcached:${id}`))).then(events => events.map(JSON.parse));
}