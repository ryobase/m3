/**
 * @module hash
 * @desc A library for generating random 128-bit hash string based off SHA1. Designed mainly 
 * for personal amusement and for studying cryptography. This should NEVER be used for 
 * security in a real world.
 * @author Moss Pakhapoca
 */

/**
 * Circular rotate left shift x by n position
 * @private
 * @param {number} x Input number
 * @param {number} n Nth position
 * @return {number}
 */
let rotl = (x, n) => (x << n) | (x >>> (32 - n));

/**
 * Apply shuffling process based on which sequence to initiate. Lifted directly from SHA1
 * @private
 * @param {number} seq Sequence number
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @return {number}
 */
let shuffle = function (seq, x, y, z) {
    switch (seq) {
        case 0:
            return (x & y) | ((~x) & y)
        case 1:
            return x ^ y ^ z;
        case 2:
            return (x & y) | (x & z) | (y & z);
        case 3:
            return x ^ y ^ z;
        default:
            break;
    }
    return 0;
};

export const hash = {
    randomHash: function (seed) {
        // Arbitary constant values
        const k = [0xABCDEF01, 0x31415926, 0x27182818, 0x10325476];
        let w;
        let buffer = [];
        let a, b, c, d;
        let i, j;
        // If seed is not provided, current time is used instead
        seed = !seed ? new Date().getTime().toString() : seed.toString();
        // Obtain number of blocks by using length of the seed in 32 bit integer
        const n = Math.ceil(seed.length / 4);
        for (i = 0; i < n; i++) {
            buffer[i] = [];
            for (j = 0; j < 16; j++) {
                // Fill the buffer with 4 characters per integer block, big-endian
                // Here we are using 32-bit char instead of 64-bit as per specified by
                // SHA1
                buffer[i][j] = (seed.charCodeAt(i + j * 4) << 24) | (seed.charCodeAt(i + j * 4 + 1) << 16) |
                    (seed.charCodeAt(i + j * 4 + 2) << 8) | (seed.charCodeAt(i + j * 4 + 3) << 0);
            }
        }
        // Fill the end of the buffer (1 byte) to store length of the message
        buffer[n - 1][15] = Math.floor(((seed.length - 1) * 8) / Math.pow(2, 32));
        // Calculate hash
        for (i = 0; i < n; i++) {
            w = [];
            for (j = 0; j < 16; j++) { w[j] = buffer[i][j]; }
            for (j = 16; j < 80; j++) { w[j] = rotl(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j], 1) }
            a = k[0], b = k[1], c = k[2], d = k[3];
            for (j = 0; j < 80; j++) {
                const s = Math.floor(j / 20);
                const temp = rotl(a, 5) + shuffle(s, a, b, c) + w[j] + k[s];
                a = c;
                b = rotl(b, 30);
                c = d;
                d = temp;
            }
            k[0] = (k[0] + a) >>> 0;
            k[1] = (k[1] + b) >>> 0;
            k[2] = (k[2] + c) >>> 0;
            k[3] = (k[3] + d) >>> 0;
        }
        // Convert to 64-bit hex string with leading zeros (we only need 32-bit)
        for (i = 0; i < k.length; i++) k[i] = ('00000000' + k[i].toString(16)).slice(-8);
        return k.join('');
    }
}