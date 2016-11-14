/**
 * <flex-grid>
 * @file Flex grid element built using HTML Custom Elements v1
 * @author: Rocco Augusto <rocco@nerdofsteel.com>
**/

class FlexGrid extends HTMLElement {
    constructor() {
        super();

        this.device = null;                                                     // set default device to `md`
        this._shadowDOM = this.createShadowRoot();                              // create shadow dom

        window.addEventListener('resize', this.viewport.bind(this));            // viewport check on window resize
    }

    static get observedAttributes() {
        return ['col', 'sm', 'md', 'lg'];                                       // default attributes to watch
    }

    get col() {
        return JSON.parse(this.getAttribute('col'));
    }

    get sm() {
        return JSON.parse(this.getAttribute('sm'));
    }

    get md() {
        return JSON.parse(this.getAttribute('md'));
    }

    get lg() {
        return JSON.parse(this.getAttribute('lg'));
    }

    // set `col` attribute
    set col(c) {
        if (c) {
            this.setAttrbute('col', JSON.stringify(c));
        }
    }

    // set `sm` attribute
    set sm(w) {
        if (w) {
            this.setAttrbute('sm', JSON.stringify(w));
        }
    }

    // set `md` attribute
    set md(w) {
        if (w) {
            this.setAttrbute('md', JSON.stringify(w));
        }
    }

    // set `lg` attribute
    set lg(w) {
        if (w) {
            this.setAttrbute('lg', JSON.stringify(w));
        }
    }

    viewport() {
        // get browser width for psuedo device-type check
        let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let viewport = (w < 768) ? 'sm' : (w >= 768 && w < 1024 ? 'md' : 'lg');

        // render again if viewport changes
        if (this.device !== viewport) {
            this.device = viewport;
            this.render();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // render on watched attribute change
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        // grab viewport size
        this.viewport();
    }

    disconnectedCallback() {
        // remove resize event from DOM on element removal
        window.removeEventListener('resize', this.viewport.bind(this));
    }

    render() {
        // grab width and children
        let children = this.querySelectorAll(':scope > *[sm], :scope > *[md], :scope > *[lg]');
        let columns = this.getAttribute('col') && !!Number(this.getAttribute('col')) ?
            this.getAttribute('col') : '12';

        // apply flex widths to all elements that need it
        children.forEach(item => {
            let viewport = item.getAttribute(this.device) ||                    // check if attr exists or set to 1
                item.getAttribute('sm') ||                                      // grab sm size if exists
                item.getAttribute('md') ||                                      // grab md size if exists
                item.getAttribute('lg') || 1;                                   // grab lg size if exists

            // set item width
            let width = Math.floor((100 / columns) * viewport);
            item.style.flexBasis = `calc(${width > 100 ? 100 : width}% - 1em)`;
        });

        let viewport = this.getAttribute(this.device) ||                        // check if attr exists or set to 1
            this.getAttribute('sm') ||                                          // grab sm size if exists
            this.getAttribute('md') ||                                          // grab md size if exists
            this.getAttribute('lg') || 1;                                       // grab lg size if exists

        if(this.parentNode.nodeName === 'FLEX-GRID') {
            let width = Math.floor((100 / (Number(this.parentNode.getAttribute('col')) || 12)) * viewport);
            console.log(width, (Number(this.parentNode.getAttribute('col')) || 12), viewport);
            this.style.flexBasis = `calc(${width > 100 ? 100 : (width < 1 ? 1 : width)}% - 1em)`;
        }

        this._shadowDOM.innerHTML = `
            <style type="text/css">
                :host { display: flex; flex-wrap: wrap; margin: -0.5em; }
                ::content > * {
                    flex: 1 0 calc(${(Math.floor(100 / columns) || 100)}% - 1em);
                    margin: 0.5em;
                    overflow: hidden;
                }
            </style>
            <content></content>
        `;
    }

}

customElements.define('flex-grid', FlexGrid);
