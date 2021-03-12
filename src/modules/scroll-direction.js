/*! scroll-direction.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

import { elementOrSelector } from "../utils/element";
import { throttle } from "../utils/event";

const DEFAULT_CONFIG = {
    scrollContainer: null,
    throttleTime: 10,
    up: () => {},
    down: () => {},
};

export default class ScrollDirection {
    constructor(options={}) {
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.listener = elementOrSelector(this.config.scrollContainer || window);
        this.container = elementOrSelector(this.config.scrollContainer || document.body);
        this.previousScrollTop = -1;

        this.initScrollListener();
    }

    destroy() {
        this.listener.removeEventListener('scroll', this.onScroll);
    }

    initScrollListener() {
        this.onScroll = throttle((e) => {
            if (this.container.scrollTop > this.previousScrollTop) {
                this.config.down();
            } else {
                this.config.up();
            }
            this.previousScrollTop = this.container.scrollTop;
        }, this.config.throttleTime);

        this.listener.addEventListener('scroll', this.onScroll);
    }
}
