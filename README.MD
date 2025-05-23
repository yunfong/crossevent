# CrossEvent TS

CrossEvent TS is a lightweight, dependency-free library for normalizing mouse and touch events in the browser. It ensures that touch interactions can trigger standard mouse event listeners and provides a simple utility for handling "tap" or "click" actions consistently.

Rewritten in TypeScript with native browser APIs (originally a jQuery plugin).

## Features

*   **Automatic Event Normalization**: Touch events (`touchstart`, `touchmove`, `touchend`) will automatically dispatch corresponding mouse events (`mousedown`, `mousemove`, `mouseup`). This means your existing `element.addEventListener('mousedown', ...)` code will also work for touch interactions.
*   **Unified Tap/Click Handling**: A simple `onTapClick` function to handle user interactions whether they are using a mouse or touch.

## Installation

After compiling the TypeScript (e.g., to `dist/crossevent.js`), you can include it in your project.

```html
<script src="path/to/your/dist/crossevent.js"></script>
```

If you are using a module bundler (like Webpack or Rollup), you can import the functions:

```typescript
import { onTapClick } // Potentially other exports if you make them available
from './path/to/your/src/crossevent'; // Or the compiled output
```

## Usage

### Listening for Tap or Click

To execute a function when an element is either clicked or tapped:

```typescript
import { onTapClick } from './crossevent'; // Adjust path as needed

const myElement = document.getElementById('myElement');

if (myElement) {
    onTapClick(myElement, (event) => {
        console.log('Element was tapped or clicked!', event);
        // event will be either a MouseEvent or a TouchEvent
    });
}
```

### Automatic Mouse Event Compatibility for Touch

Simply include the library script. No extra setup is needed. Your existing event listeners for `mousedown`, `mousemove`, and `mouseup` will now also respond to touch inputs.

For example, if you have:

```javascript
const someElement = document.getElementById('someElement');

if (someElement) {
    someElement.addEventListener('mousedown', (e) => {
        // This will now also be triggered by a touchstart event
        console.log('mousedown or touchstart detected', e);
        if ((e as any).isTouch) {
            console.log('This event was dispatched from a touch interaction.');
        }
    });

    someElement.addEventListener('mousemove', (e) => {
        // This will now also be triggered by a touchmove event
        console.log('mousemove or touchmove detected', e);
    });

    someElement.addEventListener('mouseup', (e) => {
        // This will now also be triggered by a touchend event
        console.log('mouseup or touchend detected', e);
    });
}
```

This behavior is enabled by default when the library is loaded.

## Development

1.  Ensure you have TypeScript installed (`npm install -g typescript` or as a project dev dependency).
2.  To compile, run `tsc` (assuming `tsconfig.json` is configured). This will output the JavaScript files to the `dist` directory (or as configured).
