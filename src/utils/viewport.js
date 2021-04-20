/**
 * Reference: https://stackoverflow.com/a/8876069
 */
export function getWidth() {
  const doc = document.documentElement;
  return Math.max(doc.clientWidth, window.innerWidth || 0);
}

export function getHeight() {
  const doc = document.documentElement;
  return Math.max(doc.clientHeight, window.innerHeight || 0);
}

/**
 * Reference: https://stackoverflow.com/a/3464890
 */
export function getScrollY() {
  const doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

export function getScrollX() {
  const doc = document.documentElement;
  return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
}
