/*! resize-watcher.js | (c) 2020 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * Resize Watcher
 *
 *     XXX
 *
 *
 * Usage
 *
 *     XXX
 *
 */

const INSTANCE_KEY = '_resize_watcher_js';

export default class ResizeWatcher {
    constructor(el) {
        // Prevent multiple initializations of the same element
        if (el[INSTANCE_KEY]) return el[INSTANCE_KEY];
        el[INSTANCE_KEY] = this;

        this.el = el;
        this.name = el.dataset.resizeWatcher || 'container';
        this.initResizeObserver();
    }

    initResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                this.el.style.setProperty(`--${this.name}-width`, `${width}px`);
                this.el.style.setProperty(`--${this.name}-height`, `${height}px`);
            }
        });

        this.resizeObserver.observe(this.el);
    }

    destroy() {
        this.resizeObserver.disconnect();
        delete this.resizeObserver;
        delete this.el[INSTANCE_KEY];
    }

    static initializeAll() {
        document.querySelectorAll('[data-resize-watcher]')
            .forEach(el => new ResizeWatcher(el));
    }
}
