export function getSession(key) {
    if (window.sessionStorage) {
        return window.sessionStorage.getItem(key);
    }
    return null;
}

export function setSession(key, value) {
    if (window.sessionStorage) {
        return window.sessionStorage.setItem(key, value);
    }
    return null;
}

export function getLocal(key) {
    if (window.localStorage) {
        return window.localStorage.getItem(key);
    }
    return null;
}

export function setLocal(key, value) {
    if (window.localStorage) {
        return window.localStorage.setItem(key, value);
    }
    return null;
}
