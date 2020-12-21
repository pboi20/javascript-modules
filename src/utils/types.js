/**
 * Reference: https://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string-in-javascript
 */
export function isString(obj) {
    return Object.prototype.toString.call(obj) === "[object String]"
}
