/**
 * @module M3
 * @description A simple libarry to queue and perform DOM all at once.
 * @author Moss Pakhapoca
 */

import { mo } from 'Utility/merge';

/**
 * @default
 */
const defaults = {
    tickRate: ((1 / 64) * 1000),
};

/**
 * Scheduler using standard setTimeout function
 * @private
 * @param {function} cb 
 */
function sched(cb) {
    return window.setTimeout(cb, defaults.tickRate);
}

function exec(cb, _cb) {
    const self = this;
    cb.call(null, self.scope);
    sched(_cb.bind(null, self.scope));
}

/**
 * Default constructor
 * @param {object} obj 
 */
let m3 = function (obj) {
    this.conf = mo.deep(defaults, obj);
    this.instance = [];
    this.scope = Object.create(null);
};


/**
 * @public
 */
m3.prototype.run = function() {
    const self = this;
    let curr, cb, _cb;
    while (curr = self.instance.shift()) {
        cb = curr.read;
        _cb = curr.manip;
        try {
            sched(exec.bind(self, cb, _cb));
        } catch (err) {
            console.error('Unable to execute function', err);
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
m3.prototype.enqueue = function (obj) {
    const self = this;
    if (!obj) {
        return self;
    }
    if (obj.callback === void 0) {
        if (obj.read === void 0 || obj.manip === void 0) {
            throw new Error("One or two functions callback are missing. Unable to add to queue");
        }
    }

    self.instance.push(obj);

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


module.exports = m3;