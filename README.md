# M3

A simple function queue library using built-in setTimeout to flush the queue at one frame (60fps) per
queue element.

## Usage

### Simple
Simply add a function callback that you want to run later to `enqueue()` and whenever you are ready, just run `run()`

```
var q = new m3();

q.enqueue({
    callback: function() {
        for (let i = 0; i < 100; i++>) {
            console.log(i);
        }
    }
})
.enqueue({
    callback: function() {
        console.log('Chaning works too!');
    }
})

/*
 Do something else
*/

q.run();
```

### Read/Manipulate
If you want to read data on one frame and then manipulate manupulate on another. Assign any value
to the `scope` (though any name is fine) on `read` and add a function to manipulate the `scope` on
`mainip`

*Warning: `scope` object is shared across the instance. So be careful not to overwrite any.*

```
var q = new m3();

q.enqueue({
    read: function(scope) {
        scope.val = 5;
    },
    manip: function(scope) {
        console.log(scope.val + 10);
    }
});

/*
 Do something else
*/

q.run();
```

## Author

Moss Pakhapoca

## License

MIT