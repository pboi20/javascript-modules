/*! click-listener.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * ClickListener
 *
 *     Listen for clicks inside and outside a given element.
 *
 *
 * Usage
 *
 *     new ClickListener(elementOrSelector, {
 *         inside: e => { ... },
 *         outside: e => { ... },
 *     })
 *
 */

import { elementOrSelector } from "../utils/element";

const INSTANCE_KEY = "_click_listener_js";

const DEFAULT_CONFIG = {
    inside: false,
    outside: false,
};

export default class ClickListener {
    constructor(el, options={}) {
        el = elementOrSelector(el);

        // Prevent multiple initializations of the same element
        if (el[INSTANCE_KEY]) return el[INSTANCE_KEY];
        el[INSTANCE_KEY] = this;

        this.el = el;
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.handleClicks();
    }

    destroy() {
        if (this.onClickInside) {
            this.el.removeEventListener('click', this.onClickInside);
        }
        if (this.onClickOutside) {
            document.body.removeEventListener('click', this.onClickOutside);
        }
        delete this.el[INSTANCE_KEY];
    }

    handleClicks() {
        if (this.config.inside !== false) {
            this.onClickInside = e => this.config.inside(e);
            this.el.addEventListener('click', this.onClickInside);
        }
        if (this.config.outside !== false) {
            this.onClickOutside = e => {
                if (this.el === e.target) return;
                if (this.el.contains(e.target)) return;

                this.config.outside(e);
            };
            document.body.addEventListener('click', this.onClickOutside);
        }
    }
}
