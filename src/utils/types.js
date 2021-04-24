/**
 * Reference: https://stackoverflow.com/a/17772086
 */
export function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]"
}
