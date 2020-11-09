/**
 * Reference: https://stackoverflow.com/questions/27078285/simple-throttle-in-js
 */
function throttle (callback, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            callback.apply(this, arguments);
            waiting = true;
            setTimeout(() => waiting = false, limit);
        }
    }
}

class Teleport {
    constructor(el) {
        this.el = el;
        this.initialContent = this.el.innerHTML;
        this.initRules();
        this.handleResize();
    }

    destroy() {
        window.removeEventListener('resize', this.onResize);
    }

    initRules() {
        const rulesList = JSON.parse(this.el.dataset.teleport);

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

    handleResize() {
        this.onResize = throttle(() => {
            let newRule = this.defaultRule;

            for (let rule of this.rules) {
                const query = window.matchMedia(`(min-width: ${rule.breakpoint})`);

                if (query.matches) {
                    newRule = rule;
                    break;
                }
            }

            if (!newRule.isActive) {
                this.activateRule(newRule);
            }
        }, this.RESIZE_THROTTLE_TIME);

        this.onResize();
        window.addEventListener('resize', this.onResize);
    }

    activateRule(rule) {
        if (this.activeRule) {
            this.activeRule.isActive = false;
            this.activeRule.target.innerHTML = '';
        }
        rule.target.innerHTML = this.initialContent;
        rule.isActive = true;
        this.activeRule = rule;
    }
}

Teleport.RESIZE_THROTTLE_TIME = 100;

