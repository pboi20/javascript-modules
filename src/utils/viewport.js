export function getWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

export function getHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
