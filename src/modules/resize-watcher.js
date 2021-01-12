/*! resize-watcher.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * Resize Watcher
 *
 *     Observe the size of an element and set corresponding CSS custom properties
 *     onto it.
 *
 *
 * Usage
 *
 *     new ResizeWatcher(elementOrSelector, { name: "my-container" })
 *
 *
 * Polyfills
 *
 *     https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver
 *
 */

import { elementOrSelector } from "../utils/element";

const INSTANCE_KEY = "_resize_watcher_js";

const DEFAULT_CONFIG = {
    name:  "container",
};

export default class ResizeWatcher {
    constructor(el, options={}) {
        el = elementOrSelector(el);

        // Prevent multiple initializations of the same element
        if (el[INSTANCE_KEY]) return el[INSTANCE_KEY];
        el[INSTANCE_KEY] = this;

        this.el = el;
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.name = this.config.name;
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
}
