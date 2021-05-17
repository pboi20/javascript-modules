export function enter(className, element = document.body) {
    element.classList.add(className);
    element.classList.add(className + "-enter");
    requestAnimationFrame(() => element.classList.add(className + "-enter-to"));
}

export function leave(className, element = document.body) {
    element.classList.remove(className + "-enter");
    element.classList.remove(className + "-enter-to");
    element.classList.add(className + "-leave");
    requestAnimationFrame(() => element.classList.add(className + "-leave-to"));
}

export function finish(className, element = document.body) {
    element.classList.remove(className);
    element.classList.remove(className + "-enter");
    element.classList.remove(className + "-enter-to");
    element.classList.remove(className + "-leave");
    element.classList.remove(className + "-leave-to");
}
