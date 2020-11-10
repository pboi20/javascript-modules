import throttle from '../utils/throttle';

const DEFAULT_CONFIG = {
    isTeleportedClass:  'is-teleported',
    resizeThrottleTime: 100,
    onTeleported: () => {},
};

const INSTANCE_KEY = '_teleport_js';

export default class Teleport {
    constructor(el, options={}) {
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
        window.removeEventListener('resize', this.onResize);
        this.activateRule(this.defaultRule);
        delete this.el[INSTANCE_KEY];
    }

    initRules() {
        const rulesList = this.config.rules || JSON.parse(this.el.dataset.teleport);

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
                const query = window.matchMedia(`(min-width: ${rule.breakpoint})`);

                if (query.matches) {
                    newRule = rule;
                    break;
                }
            }

            this.activateRule(newRule);
        }, this.config.isTeleportedClass);

        this.onResize();
        window.addEventListener('resize', this.onResize);
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

        if (typeof this.config.onTeleported === 'function') {
            this.config.onTeleported(rule.target);
        }
    }

    deactivateRule(rule) {
        rule.isActive = false;
        rule.target.innerHTML = '';
        rule.target.classList.remove(this.config.isTeleportedClass);
    }

    static initializeAll() {
        document.querySelectorAll('[data-teleport]')
            .forEach(el => new Teleport(el));
    }
}