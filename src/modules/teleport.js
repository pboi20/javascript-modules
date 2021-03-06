/*! teleport.js | (c) 2021 Patrick Boivin | MIT License | https://github.com/pboi20/javascript-modules */

/**
 * Teleport
 *
 *     Move markup between container elements following responsive rules.
 *
 *
 * Usage
 *
 *     new Teleport(elementOrSelector, {
 *         rules: [
 *             ["1024px", "#destionation-lg"],
 *             ["768px", "#destionation-md"],
 *             // ...
 *         ]
 *     })
 *
 */

import { elementOrSelector } from "../utils/element";
import { throttle } from "../utils/event";

const DEFAULT_CONFIG = {
    isTeleportedClass:  "is-teleported",
    resizeThrottleTime: 100,
    onTeleported: () => {},
    matchMedia: rule => window.matchMedia(`(min-width: ${rule.breakpoint})`),
};

const INSTANCE_KEY = "_teleport_js";

export default class Teleport {
    constructor(el, options={}) {
        el = elementOrSelector(el);

        // Prevent multiple initializations of the same element
        if (el[INSTANCE_KEY]) return el[INSTANCE_KEY];
        el[INSTANCE_KEY] = this;

        this.el = el;
        this.config = Object.assign({}, DEFAULT_CONFIG, options);
        this.initialContent = this.el.innerHTML;

        this.initRules();
        this.initResize();
    }

    destroy() {
        window.removeEventListener("resize", this.onResize);
        this.activateRule(this.defaultRule);
        delete this.el[INSTANCE_KEY];
    }

    initRules() {
        const rulesList = this.config.rules;

        this.rules = rulesList.map(rule => ({
            breakpoint: rule[0],
            target: document.querySelector(rule[1]),
            isActive: false,
        }));

        this.defaultRule = {
            breakpoint: null,
            target: this.el,
            isActive: true,
        };

        this.activeRule = this.defaultRule;
    }

    initResize() {
        this.onResize = throttle(() => {
            let newRule = this.defaultRule;

            for (let rule of this.rules) {
                const query = this.config.matchMedia(rule);

                if (query.matches) {
                    newRule = rule;
                    break;
                }
            }

            this.activateRule(newRule);
        }, this.config.resizeThrottleTime);

        this.onResize();
        window.addEventListener("resize", this.onResize);
    }

    activateRule(rule) {
        if (rule.isActive) return;

        if (this.activeRule) {
            this.deactivateRule(this.activeRule);
        }
        if (rule.breakpoint) {
            rule.target.classList.add(this.config.isTeleportedClass);
        }
        rule.isActive = true;
        rule.target.innerHTML = this.initialContent;
        this.activeRule = rule;

        if (typeof this.config.onTeleported === "function") {
            this.config.onTeleported(rule.target);
        }
    }

    deactivateRule(rule) {
        rule.isActive = false;
        rule.target.innerHTML = "";
        rule.target.classList.remove(this.config.isTeleportedClass);
    }
}
