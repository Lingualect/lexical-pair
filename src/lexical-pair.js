
export default class LexicalPair extends HTMLElement {

    get term() {
        return this.getAttribute('term');
    }

    set term(value) {
        this.setAttribute('term', value);
    }

    get pair() {
        return this.getAttribute('pair');
    }

    set pair(value) {
        this.setAttribute('pair', value);
    }

    createdCallback() {
        this.render();
    }

    attributeChangedCallback(name, cache, value) {
        if (name == 'term' || name == 'pair') {
            let element = this.querySelector(`.${name}`);
            if (element) {
                element.textContent = value;
            }
        }
    }

    render() {
        let list = Array.prototype.slice.call(this.attributes);
        let hash = list.reduce(function(result, attribute) {
            result[attribute.name] = attribute.value;
            return result;
        }, {});
        this.innerHTML = this.template(hash);
    }

    template(data) {
        data = data || {};
        return `
            <div class="term">${data.term || ''}</div>
            <div class="pair">${data.pair || ''}</div>
        `;
    }

}

document.registerElement('lexical-pair', LexicalPair);
