/*! scroll-direction.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * Scroll Direction
 *
 *     Listen to scroll events and execute custom actions according to the direction
 *     of the scroll.
 *
 *
 * Usage
 *
 *     new ScrollDirection({
 *         up: () => {
 *             ...
 *         },
 *         down: () => {
 *             ...
 *         },
 *     })
 *
 */
import { elementOrSelector } from "../utils/element";
import { throttle } from "../utils/event";
import * as viewport from "../utils/viewport";

const DEFAULT_CONFIG = {
    scrollContainer: null,
    throttleTime: 10,
    up: () => {},
    down: () => {},
};

export default class ScrollDirection {
    constructor(options={}) {
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.previousPosition = -1;

        this.initScrollListener();
    }

    destroy() {
        this.listener.removeEventListener('scroll', this._onScroll);
    }

    initScrollListener() {
        this._onScroll = throttle((e) => {
            if (this.position > this.previousPosition) {
                this.config.down();
            } else {
                this.config.up();
            }
            this.previousPosition = this.position;
        }, this.config.throttleTime);

        this.listener.addEventListener('scroll', this._onScroll);
    }

    get listener() {
        if (! this._listenerElement) {
            if (this.config.scrollContainer) {
                this._listenerElement = elementOrSelector(this.config.scrollContainer);
            } else {
                this._listenerElement = window;
            }
        }
        return this._listenerElement;
    }

    get position() {
        if (this.listener === window) {
            return viewport.getScrollTop();
        }
        return this.listener.scrollTop;
    }
}
