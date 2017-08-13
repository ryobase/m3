# M3

A simple function queue library using built-in setTimeout to flush the queue.

## Usage

To add to queue simply add a function callback that you want to run later to `enqueue()` and whenever you are ready, just run `run()`

### For example: 

```
var q = new m3();

q.enqueue(function() {
    console.log('It worked');
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