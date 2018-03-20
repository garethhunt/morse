(function () {
  const letters = {
    'a': [1,2],
    'b': [2,1,1,1],
    'c': [2,1,2,1],
    'd': [2,1,1],
    'e': [1],
    'f': [1,1,2,1],
    'g': [2,2,1],
    'h': [1,1,1,1],
    'i': [1,1],
    'j': [1,2,2,2],
    'k': [2,1,2],
    'l': [1,2,1,1],
    'm': [2,2],
    'n': [2,1],
    'o': [2,2,2],
    'p': [1,2,2,1],
    'q': [2,2,1,2],
    'r': [1,2,1],
    's': [1,1,1],
    't': [2],
    'u': [1,1,2],
    'v': [1,1,1,2],
    'w': [1,2,2],
    'x': [2,1,1,2],
    'y': [2,1,2,2],
    'z': [2,2,1,1],
    ' ': [8],
    '1': [  ],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
    '0': []
  }

  const audioContext = new (window.AudioContext||window.webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);

  function transmit (volume, length, char, morseArray, index) {
    // Print character
    if (char != '') {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      document.getElementById('messages').lastChild.appendChild(charSpan);
    }

    // Set the volume
    gainNode.gain.setTargetAtTime(volume, audioContext.currentTime, 0);

    // Create the oscillator
    const oscillator = audioContext.createOscillator();
    // Safari returns undefined from connect
    oscillator.connect(gainNode);
    oscillator.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.type='sine'; //sine, square, sawtooth, triangle
    oscillator.addEventListener('ended', function () {
      setTimeout(function () {
        play(morseArray, index+1);
      }, volume == 0 ? 0 : 150);
    });

    oscillator.start();
    oscillator.stop(audioContext.currentTime + length);
  }

  const dit = transmit.bind(undefined, 1, 0.15, '.');
  const dah = transmit.bind(undefined, 1, 0.45, '-');
  const lspace = transmit.bind(undefined, 0, 0.45, '');
  const wspace = transmit.bind(undefined, 0, 1.05, ' ');

  function play (morseArray, index) {
    const sound = morseArray[index];
    switch (sound) {
      case 1: // dit
       dit(morseArray, index);
       break;
      case 2: // dah
       dah(morseArray, index);
       break;
      case 4: // letter space
        lspace(morseArray, index);
        break;
      case 8: // word space
        wspace(morseArray, index);
        break;
      default: //Message has ended or undefined character
        break;
    }
  }

  function morseReducer (result, letter, index, messageArray) {
    const space = (messageArray[index] === ' ' || messageArray[index+1] === ' ' || messageArray[index+1] === undefined) ? [] : 4;
    return result.concat(letters[letter], space);
  }

  function parse (message) {
    const messageArray = message.split('');
    return messageArray.reduce(morseReducer, []);
  }

  function send () {
    const message = document.getElementById('message').value;

    if (message.trim().length > 0) {
      // Add a container for the message to print out
      const messageDiv = document.createElement('div');
      document.getElementById('messages').appendChild(messageDiv);

      // Play the message
      play(parse(message.trim().toLowerCase()), 0);
    }
  }

  function doInit () {
    document.getElementById('send').addEventListener('click', send);
    document.getElementById('message').focus();
  }

  window.addEventListener('load', doInit);
})();