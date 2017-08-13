/**
 * @module mo
 * @desc A library for merging Javascript objects.
 * @author Moss Pakhapoca
 */

/**
 * 
 */
const isObj = (a) => typeof !!a && a === 'object' 
    && Object.prototype.toString.call(a) !== '[object RegExp]'
    && Object.prototype.toString.call(a) !== '[object Date]';

/**
 * @private
 * @param {*} a 
 * @return {boolean}
 */
const isEmpty = (a) => Array.isArray(a) ? [] : {};

/**
 * @public
 * @param {object} o1 
 * @param {object} o2 
 * @return {object}
 */
function deep(o1, o2) {
    // Deep copy objects, does not merge array
    let _m = (o) => {
        Object.keys(o).forEach((key, i) => {
            if (Object.prototype.hasOwnProperty.call(o, key)) {
                if (isObj(o[key])) out[key] = mo.deep(out[key], o[key]);
                else out[key] = o[key];
            }
        });
    };
    let out = isObj(o1) ? Object.assign({}, o1) : {};
    let _oa, i = 0;
    if (arguments.length > 2) {
        _oa = Array.from(arguments);
    }
    else if (!o2) return o1;
    if (_oa) {
        while (_oa.length > 0) {
            _m(_oa.shift());
        }
    } else {
        _m(o2);
    }
    return out;
}

export const mo = {
    isObj: isObj,
    deep: deep,
};
