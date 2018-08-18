const redis = require('./redis');

module.exports.storeEventsAsEncodedList = function (data){
    return redis.storeListInCache('eventsAsEncodedListRedis', data.map(JSON.stringify));
}
module.exports.getEventsAsEncodedList = function (){
    return redis.getListFromCache('eventsAsEncodedListRedis').then(events => events.map(JSON.parse));
}

module.exports.storeEventsAsObjects = function (data){
    return Promise.all(data.map(event => redis.storeObjectInCache(`eventAsObjectRedis:${event.event_uid}`, event)));
}
module.exports.getEventsAsObjects = function (ids){
    return Promise.all(ids.map(id => redis.getObjectFromCache(`eventAsObjectRedis:${id}`)));
}

module.exports.storeEventsAsEncodedObjects = function (data){
    return Promise.all(data.map(event => redis.set(`eventsAsEncodedObjectRedis:${event.event_uid}`, JSON.stringify(event))));
}
module.exports.getEventsAsEncodedObjects = function (ids){
    return Promise.all(ids.map(id => redis.get(`eventsAsEncodedObjectRedis:${id}`))).then(events => events.map(JSON.parse));
}