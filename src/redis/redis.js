const { promisifyAll } = require('bluebird');
const redis = require('redis');

promisifyAll(redis);
const client = redis.createClient();

const DEFAULT_EXPIRATION = 1 * 60 * 60 //Store the data for 10 minutes by default
const INDEX_START_OF_ARRAY = 0;
const INDEX_END_OF_ARRAY = -1;
const EMPTY_LIST_VALUE = 'EMPTY_LIST';

module.exports.getListFromCache = function(key) {
  return client.lrangeAsync(key, INDEX_START_OF_ARRAY, INDEX_END_OF_ARRAY)
    .then(list => (list[0] === EMPTY_LIST_VALUE ? [] : list))
}

module.exports.storeListInCache = function(key, values, expiration = DEFAULT_EXPIRATION) {
  return client
    .multi()
    .rpush(key, values.length === 0 ? [EMPTY_LIST_VALUE] : values) // You can't push an empty list to redis)
    .expire(key, expiration)
    .execAsync()
}

module.exports.storeObjectInCache = function(key, obj, expiration = DEFAULT_EXPIRATION) {
  return client.multi().hmset(key, obj).expire(key, expiration).execAsync();
}

module.exports.getObjectFromCache = function(key) {
  return client.hgetallAsync(key);
}

module.exports.removeData = function(...keys) {
  return client.delAsync(...keys)
}

module.exports.clearDatabase = function() {
  return client.flushdbAsync()
}

module.exports.getKeys = function() {
  return client.keysAsync('*')
}

module.exports.set = function(key, value) {
  return client.setAsync(key, value)
}

module.exports.get = function(key) {
  return client.getAsync(key)
}