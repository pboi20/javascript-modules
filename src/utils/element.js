import { isString } from "./types";

export function elementOrSelector(item) {
    if (isString(item)) {
        return document.querySelector(item);
    }
    return item;
}
