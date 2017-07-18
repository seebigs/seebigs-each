const each = require('../index.js');

function describe (description, assertions) {
    assertions(description);
}

function shouldNotBeCalled (desc) {
    allPassed = false;
    console.log('\n' + desc + '\n   should not be called');
}

function shouldEqual (actual, expected, desc) {
    if (actual !== expected) {
        allPassed = false;
        console.log('\n' + desc + '\n   actual was not expected');
    }
}

var allPassed = true;
var arr = [1, 2, 3];
var obj = { abc: 123, def: 456 };

describe("when given undefined does not call the callback", function(desc) {
    each(void 0, function () {
        shouldNotBeCalled(desc);
    });
});

describe("when given an empty array does not call the callback", function(desc) {
    each([], function () {
        shouldNotBeCalled(desc);
    });
});

describe("when given an array with length iterates the array", function(desc) {
    var actual = [],
        expected = [
            { ndx: 0, val: 1, col: arr },
            { ndx: 1, val: 2, col: arr },
            { ndx: 2, val: 3, col: arr }
        ];
    each(arr, function(v, k, c) {
        actual.push({ ndx: k, val: v, col: c });
    });
    shouldEqual(actual.length, expected.length, desc);
    shouldEqual(actual[1].ndx, 1, desc);
    shouldEqual(actual[1].val, 2, desc);
});

describe("when given an arguments object iterates the arguments", function(desc) {
    var actual = [];
    var expected;

    function someFn () {
        expected = [
            { ndx: 0, val: arguments[0], col: arguments },
            { ndx: 1, val: arguments[1], col: arguments }
        ];

        each(arguments, function(v, k, c) {
            actual.push({ ndx: k, val: v, col: c });
        });
    }

    someFn('arg1', 'arg2');
    shouldEqual(actual.length, expected.length, desc);
    shouldEqual(actual[1].ndx, 1, desc);
    shouldEqual(actual[1].val, 'arg2', desc);
});

describe("when given an object iterates the object", function(desc) {
    var actual = [],
        expected = [
            { key: 'abc', val: 123, col: obj },
            { key: 'def', val: 456, col: obj }
        ];
    each(obj, function(v, k, c) {
        actual.push({ key: k, val: v, col: c });
    });
    shouldEqual(actual.length, expected.length, desc);
    shouldEqual(actual[1].key, 'def', desc);
    shouldEqual(actual[1].val, 456, desc);
});

describe("when given an object with length (jquery) iterates the object as it would an array", function(desc) {
    var jq = { 0: 'body', length: 1 },
        actual = [],
        expected = [
            { key: 0, val: 'body', col: jq }
        ];
    each(jq, function(v, k, c) {
        actual.push({ key: k, val: v, col: c });
    });
    shouldEqual(actual.length, expected.length, desc);
    shouldEqual(actual[0].key, 0, desc);
    shouldEqual(actual[0].val, 'body', desc);
});

describe("when an iteratee returns false drops out of the loop", function(desc) {
    var lastVal;
    each(arr, function(v) {
        lastVal = v;
        return false;
    });
    shouldEqual(lastVal, 1, desc);
});

if (allPassed) {
    console.log('\nAll Passed!\n');
}
