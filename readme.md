Flicker component
=================

[![build status](https://img.shields.io/travis/spasdk/component-flicker.svg?style=flat-square)](https://travis-ci.org/spasdk/component-flicker)
[![npm version](https://img.shields.io/npm/v/spa-component-flicker.svg?style=flat-square)](https://www.npmjs.com/package/spa-component-flicker)
[![dependencies status](https://img.shields.io/david/spasdk/component-flicker.svg?style=flat-square)](https://david-dm.org/spasdk/component-flicker)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/component-flicker.svg?style=flat-square)](https://david-dm.org/spasdk/component-flicker?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


Flicker is a component to build user interface, an instance of [Component](https://github.com/spasdk/component) module.


## Installation ##

```bash
npm install spa-component-flicker
```


## Usage ##

Add the constructor to the scope:

```js
var Flicker = require('spa-component-flicker');
```

Create an instance with config:

```js
var flicker = new Flicker({
    className: 'clock',
    interval: 1000,
    render: function ( $item, value ) {
        var time  = new Date(),
            hours = time.getHours(),
            mins  = time.getMinutes();

        $item.innerText = (hours > 9 ? hours : '0' + hours) + ':' + (mins > 9 ? mins : '0' + mins);
    }
});
```

Start flickering:

```js
flicker.start();
```

Stop flickering:

```js
flicker.stop();
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/spasdk/component-flicker/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`spa-component-flicker` is released under the [MIT License](license.md).
