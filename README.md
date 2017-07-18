# seebigs-each

*Safely iterate over each item in an Object or Array*

# Install
```
$ npm install seebigs-each
```

# Use
```js
var each = require('seebigs-each');

each(collection, function (value, key, collection) {
    if (value.indexOf('foo') !== -1) {
        console.log(value);
        return false; // return false to drop out of loop early
    }
});
```
