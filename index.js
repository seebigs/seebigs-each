
function each (collection, iteratee, thisArg) {
    if (collection) {
        if (typeof collection.length !== 'undefined') {
            for (var i = 0, len = collection.length; i < len; i++) {
                if (iteratee.call(thisArg, collection[i], i, collection) === false) {
                    return;
                }
            }

        } else {
            for (var i = 0, keys = Object.keys(collection), len = keys.length; i < len; i++) {
                if (iteratee.call(thisArg, collection[keys[i]], keys[i], collection) === false) {
                    return;
                }
            }
        }
    }
}

module.exports = each;
