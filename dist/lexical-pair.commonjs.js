'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LexicalPair = function (_HTMLElement) {
    _inherits(LexicalPair, _HTMLElement);

    function LexicalPair() {
        _classCallCheck(this, LexicalPair);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LexicalPair).apply(this, arguments));
    }

    _createClass(LexicalPair, [{
        key: 'createdCallback',
        value: function createdCallback() {
            this.render();
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback(name, cache, value) {
            if (name == 'term' || name == 'pair') {
                var element = this.querySelector('.' + name);
                if (element) {
                    element.textContent = value;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var list = Array.prototype.slice.call(this.attributes);
            var hash = list.reduce(function (result, attribute) {
                result[attribute.name] = attribute.value;
                return result;
            }, {});
            this.innerHTML = this.template(hash);
        }
    }, {
        key: 'template',
        value: function template(data) {
            data = data || {};
            return '\n            <div class="term">' + (data.term || '') + '</div>\n            <div class="pair">' + (data.pair || '') + '</div>\n        ';
        }
    }, {
        key: 'term',
        get: function () {
            return this.getAttribute('term');
        },
        set: function (value) {
            this.setAttribute('term', value);
        }
    }, {
        key: 'pair',
        get: function () {
            return this.getAttribute('pair');
        },
        set: function (value) {
            this.setAttribute('pair', value);
        }
    }]);

    return LexicalPair;
}(HTMLElement);

exports.default = LexicalPair;


document.registerElement('lexical-pair', LexicalPair);