# app-context-access-mongo

[access-mongo](https://www.npmjs.com/package/access-mongo) initializer for [app-context](https://www.npmjs.com/package/app-context)

### Installation

```bash
$ npm install --save app-context-access-mongo
```

### Usage

```javascript
var AppContext = require('app-context');
var accessMongo = require('app-context-access-mongo');

module.exports = AppContext.createContext({
  configure: function() {
    this.use(
      AppContext.RunLevel.Connected,
      // load the mongodb URL from your APP.config.mongodb
      accessMongo('mongodb')

      // load 2 connections and assign them to the default connection and the users connection
      accessMongo({
        default: 'mongodb://localhost/main',
        users: 'mongodb://foo:bar@localhost/users'
      })
    );

    // you can optionally use app-context-access-mongo through app-context-initialize
    // to create connections from APP.config.mongodb.centralDB and APP.config.mongodb.users
    var initialize = require('app-context-initialize');
    this.use(
      AppContext.RunLevel.Connected,
      initialize({
        'access-mongo': {
          default: '$mongodb.centralDB',
          users: '$mongodb.users'
        }
      })
    );
  }
});
```
