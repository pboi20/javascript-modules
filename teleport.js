class Teleport {
    constructor(el) {
        this.el = el;
        this.rules = JSON.parse(this.el.dataset.teleport);
        this.innerHTML = this.el.innerHTML;

        this.el.innerHTML = '';

        this.handleResize();

        //window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        if (this.rules.length === 0) return;

        for (let rule of this.rules) {
            let query = window.matchMedia(`(min-width: ${rule[0]})`);

            if (query.matches) {
                const target = document.querySelector(rule[1]);

                if (target) {
                    target.innerHTML = this.innerHTML;
                    console.log('Rule matched:', rule[0])
                    return;
                }
            }

            this.el.innerHTML = this.innerHTML;
            console.log('No rules matched')
        }
    }
}
