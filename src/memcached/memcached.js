const Memcached = require("memcached-promisify");
const memcached = new Memcached();

const DEFAULT_EXPIRATION = 1 * 60 * 60; //Store the data for 10 minutes by default

module.exports.set = function(key, value) {
  return memcached.set(key, value, DEFAULT_EXPIRATION);
};

module.exports.del = function(key) {
  return memcached.del(key);
};

module.exports.get = function(key) {
  return memcached.get(key);
};