var packageCacheKeys = function(packageName) {
  var keys = [];
  var cacheFile = require.resolve(packageName);

  if (cacheFile) {
    var cachePrefix = cacheFile.slice(0, cacheFile.lastIndexOf('node_modules/' + packageName + '/') + 'node_modules/' + packageName + '/'.length);

    Object.keys(require.cache).forEach(function(k) {
      if (k.indexOf(cachePrefix) === 0) {
        keys.push(k);
      }
    });
  }

  return keys;
};

var noConflictRequire = function(packageName) {
  // grab current cache and delete it from require.cache
  var cache = packageCacheKeys(packageName).reduce(function(o, k) {
    o[k] = require.cache[k];
    delete require.cache[k];
    return o;
  }, {});

  // require module fresh
  var packageModule = require(packageName);

  // restore cache
  packageCacheKeys(packageName).forEach(function(k) {
    delete require.cache[k];
  });
  Object.keys(cache).forEach(function(k) {
    require.cache[k] = cache[k];
  });

  return packageModule;
};

module.exports = function(config) {
  if (!config) {
    throw new Error('The access-mongo initializer takes a string or object');
  }

  return function(context) {
    var AccessMongo = noConflictRequire('access-mongo');

    context.mongodb = AccessMongo;

    return AccessMongo.connect(config);
  };
};
