/**
 * @module M3
 * @description A simple libarry to queue and perform DOM all at once.
 * @author Moss Pakhapoca
 */

import { mo } from 'Utility/merge';
import { hash } from 'Utility/hash';

/**
 * Scheduler using standard setTimeout function
 * @private
 * @param {function} cb 
 */
function sched(cb) {
    return window.setTimeout(cb, m3.conf.tickRate);
}

/**
 * @private
 * @default
 */
const defaults = {
    tickRate: ((1 / 64) * 1000),
};

/**
 * Default constructor
 * @param {object} obj 
 */
let m3 = function (obj) {
    this.conf = mo.deep(defaults, obj);
};

// Instance queue
m3.prototype.instance = [];

// Counter is used to help generate a unique ID
// Will never descrease
m3.prototype.counter = 0;

/**
 * @public
 */
m3.prototype.run = function() {
    const self = this;
    let curr, cb, args;
    while (curr = self.instance.shift()) {
        cb = curr.callback;
        args = curr.argv;
        try {
            sched(cb.bind(null, args));
        } catch (err) {
            console.error('Unable to execute function ' + curr.name, err);
        }
    }
    return self;
}

/**
 * @public
 */
m3.prototype.clear = function () {
    const self = this;
    while (self.instance.length > 1)
        self.instance.pop();
    return self;
}

/**
 * @public
 * @param {array} args Array of arguments
 * @param {string} name [optional] Name of the function
 */
m3.prototype.enqueue = function (fn, args, name) {
    const self = this;
    if (!fn) {
        return self;
    }

    do {
        _o = Object.create(null);
        _o.name = name ? name : 'm' + self.counter;
        _o.hashId = hash.randomHash(_o.name);
        _o.callback = typeof fn === 'function' ? fn : null;
        _o.argv = args ? args : null;
    } while (false);

    if (self.instance.filter(x => x.hashId === _o.hashId).length == 0) {
        self.instance.push(_o);
        self.counter++;
    }
    return self;
}

/**
 * @public
 */
m3.prototype.dequeue = function () {
    if (this.instance.length > 1)
        this.instance.shift();
    else
        console.error('Queue is empty. Unable to de-queue');
    return this;
}