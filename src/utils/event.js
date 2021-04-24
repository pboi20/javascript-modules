/**
 * Reference: https://stackoverflow.com/a/27078401
 */
export function throttle(callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    }
}

export function dispatch(eventName, detail) {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

