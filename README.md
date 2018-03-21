# Web Audio API Demo

Simple demonstration of the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), using [Morse Code](https://en.wikipedia.org/wiki/Morse_code). Not all browsers support this API, see [browser compatibility tables](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#Browser_compatibility).

To try it out, go to [https://garethhunt.github.io/morse/](https://garethhunt.github.io/morse/), enter a message into the textbox and press the send button.

## To Install

Optionally install node modules for a development server:

    // Use npm or yarn, whichever you prefer
    $ npm install
    $ yarn install

## Run development server

Browser-sync is used for the development server:

    // Use npm or yarn, whichever you prefer
    $ npm start
    $ yarn start

## TODO:

1. [x] Make the UI prettier
1. [ ] Waveform controls (Shape, frequency)
1. [ ] Volume control
1. [ ] Sound length controls