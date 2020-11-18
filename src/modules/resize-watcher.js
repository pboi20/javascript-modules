/*! resize-watcher.js | (c) 2020 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * Resize Watcher
 *
 *     Observe the size of an element and set corresponding CSS custom properties
 *     onto it.
 *
 *
 * Usage
 *
 *     Via JS:
 *
 *         new ResizeWatcher(element, { name: "my-container" })
 *
 *
 *     Via HTML Data Attributes:
 *
 *         <div data-resize-watcher="my-container">
 *             <!-- ... -->
 *         </div>
 *
 *
 *     You need to call `ResizeWatcher.initializeAll()` to detect
 *     `data-resize-watcher` attributes.
 *
 */

const INSTANCE_KEY = "_resize_watcher_js";

const DEFAULT_CONFIG = {
    name:  "container",
};

export default class ResizeWatcher {
    constructor(el, options={}) {
        // Prevent multiple initializations of the same element
        if (el[INSTANCE_KEY]) return el[INSTANCE_KEY];
        el[INSTANCE_KEY] = this;

        this.el = el;
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.name = el.dataset.resizeWatcher || this.config.name;
        this.initResizeObserver();
    }

    destroy() {
        this.resizeObserver.disconnect();
        delete this.resizeObserver;
        delete this.el[INSTANCE_KEY];
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

    static initializeAll() {
        document.querySelectorAll("[data-resize-watcher]")
            .forEach(el => new ResizeWatcher(el));
    }
}
