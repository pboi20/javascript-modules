/*! scroll-direction.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

import { throttle } from "../utils/event";

const DEFAULT_CONFIG = {
    throttleTime: 10,
    up: () => {},
    down: () => {},
};

export default class ScrollDirection {
    constructor(options={}) {
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.previousScrollTop = -1;
        this.scrollTop = document.body.scrollTop;

        this.initScrollListener();
    }

    destroy() {
        window.removeEventListener('scroll', this.onScroll);
    }

    initScrollListener() {
        this.onScroll = throttle((e) => {
            this.scrollTop = document.body.scrollTop;

            if (this.scrollTop > this.previousScrollTop) {
                this.config.down();
            } else {
                this.config.up();
            }
            this.previousScrollTop = this.scrollTop;
        }, this.config.throttleTime);

        window.addEventListener('scroll', this.onScroll);
    }
}
