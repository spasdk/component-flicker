/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('stb-component');


/**
 * Base flicker implementation.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 * @param {Function} [config.render] custom render function
 * @param {number} [config.interval=1000] interval for flicking
 * @param {string} [config.value] value to set in flickering container
 */
function Flicker ( config ) {
    var self = this,
        timerId;

    // sanitize
    config = config || {};

    console.assert(typeof this === 'object', 'must be constructed via new');

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) {
            throw new Error(__filename + ': wrong config type');
        }
        if ( config.className && typeof config.className !== 'string' ) {
            throw new Error(__filename + ': wrong or empty config.className');
        }
        if ( config.value == null && !config.render ) {
            throw new Error(__filename + ': nothing to render (absent value)');
        }
        if ( config.render && typeof config.render !== 'function' ) {
            throw new Error(__filename + ': wrong config.render type');
        }
        if ( config.value && typeof config.value !== 'string' ) {
            throw new Error(__filename + ': wrong config.value type');
        }
    }

    if ( config.render ) {
        this.render = config.render;
    }

    this.interval = config.interval || 1000;

    this.value = config.value;

    // set default className if classList property empty or undefined
    config.className = 'flicker ' + (config.className || '');

    Object.defineProperty(this, 'interval', {
        set: function ( value ) {
            if ( DEVELOP ) {
                if ( !(typeof value === 'number' && isFinite(value) && !(value % 1) && value >= 0) ) {
                    throw new Error(__filename + ': wrong interval value');
                }
            }
            this.interval = value;
        }
    });

    this.start = function () {
        if ( !this.active ) {
            this.active = true;
            // starts immediately
            (function run() {
                self.render(self.$item, self.value);
                timerId = setTimeout(run, self.interval);
            }());
        }
    };

    this.stop = function () {
        this.active = false;
        clearTimeout(timerId);
    };

    // parent constructor call
    Component.call(this, config);
}


// inheritance
Flicker.prototype = Object.create(Component.prototype);
Flicker.prototype.constructor = Flicker;


/**
 * Fill the given item with data.
 *
 * @param {Element} $item item DOM link
 * @param {string} value associated with this item data
 */
Flicker.prototype.defaultRender = function ( $item, value ) {
    $item.innerText = value;
};


/**
 * Can be redefined to provide custom rendering.
 *
 * @type {function}
 */
Flicker.prototype.render = Flicker.prototype.defaultRender;