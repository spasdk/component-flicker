/**
 * @license The MIT License (MIT)
 * @author Yaroslav Surilov <y.surilov@infomir.com>
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
 * @param {function} [config.render] custom render function
 * @param {number} [config.interval=1000] interval for flicking
 * @param {string} [config.value] value to set in flickering container
 */
function Flicker ( config ) {
    var interval;

    // sanitize
    config = config || {};

    this.timerId = 0;

    console.assert(typeof this === 'object', 'must be constructed via new');

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) {
            throw new Error(__filename + ': wrong config type');
        }
        if ( config.className && typeof config.className !== 'string' ) {
            throw new Error(__filename + ': wrong or empty config.className');
        }
        if ( !config.value && !config.render ) {
            throw new Error(__filename + ': nothing to render (absent value and render method)');
        }
        if ( config.render && typeof config.render !== 'function' ) {
            throw new Error(__filename + ': wrong config.render type');
        }
    }

    if ( config.render ) {
        this.render = config.render;
    }

    config.focusable = false;

    config.visible = config.visible || true;

    this.value = config.value;

    // initial state
    this.active = false;

    // set default className if classList property empty or undefined
    //config.className = 'flicker ' + (config.className || '');

    Object.defineProperty(this, 'interval', {
        set: function ( value ) {
            if ( DEVELOP ) {
                // interval must be 0 or positive integer
                if ( !(typeof value === 'number' && isFinite(value) && !(value % 1) && value >= 0) ) {
                    throw new Error(__filename + ': wrong interval value');
                }
            }
            interval = value;
        },
        get: function () {
            return interval;
        }
    });

    this.interval = config.interval || 1000;

    // parent constructor call
    Component.call(this, config);

    //this.$body.appendChild(document.createElement('div'));
}


// inheritance
Flicker.prototype = Object.create(Component.prototype);
Flicker.prototype.constructor = Flicker;

// set component name
Flicker.prototype.name = 'spa-component-flicker';


/**
 * Start flickering.
 */
Flicker.prototype.start = function () {
    var self = this;

    if ( !this.active ) {
        this.active = true;
        // starts immediately
        (function run () {
            self.render(self.$node, self.value);
            self.timerId = setTimeout(run, self.interval);
        })();
    }
};


/**
 * Stop flickering.
 */
Flicker.prototype.stop = function () {
    if ( this.active ) {
        this.active = false;
        clearTimeout(this.timerId);
    }
};


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


// public
module.exports = Flicker;
