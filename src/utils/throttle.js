/**
 * Reference: https://stackoverflow.com/questions/27078285/simple-throttle-in-js
 */
export default function throttle(callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    }
}
