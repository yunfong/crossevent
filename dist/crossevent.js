// Helper to check for touch-enabled environment
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const eventMap = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup'
};
export function dispatchMouseEventFromTouchEvent(event) {
    const first = event.changedTouches[0];
    const type = eventMap[event.type];
    // Ensure 'first' and 'first.target' are valid before proceeding
    if (!type || !first || !first.target) {
        return;
    }
    const mouseEvent = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window, // 'view' should be the window object
        detail: 1, // Typically 1 for a click
        screenX: first.screenX,
        screenY: first.screenY,
        clientX: first.clientX,
        clientY: first.clientY,
        ctrlKey: event.ctrlKey, // Carry over modifier keys
        altKey: event.altKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey,
        button: 0, // 0 for main button (left-click)
        relatedTarget: null
    });
    mouseEvent.isTouch = true;
    if (event.changedTouches.length === 1 && event.cancelable) {
        event.preventDefault();
    }
    first.target.dispatchEvent(mouseEvent);
}
// Ensure this code runs only in a browser environment for global listeners
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('touchstart', dispatchMouseEventFromTouchEvent, { passive: false });
    document.addEventListener('touchmove', dispatchMouseEventFromTouchEvent, { passive: false });
    document.addEventListener('touchend', dispatchMouseEventFromTouchEvent, { passive: false });
}
export function onTapClick(element, callback) {
    if (!element || typeof callback !== 'function') {
        console.error('onTapClick: Invalid element or callback');
        return;
    }
    let tapFlag = false; // Flag to identify if a tap (touchend) has just been processed
    const clickHandler = (event) => {
        // If the event is marked as `isTouch` (coming from our touch-to-mouse dispatch)
        // or if `tapFlag` is set (meaning touchend just ran),
        // then this click is either our synthetic one or an emulated one.
        // For `tapclick`, we rely on `touchend` for the "tap" part.
        // So, ignore clicks that are too close to a `touchend` or are synthetic.
        if (event.isTouch || tapFlag) {
            if (tapFlag) { // If it's an emulated click after touchend
                event.preventDefault();
                event.stopPropagation();
            }
            // If (event as any).isTouch, it's our synthetic event.
            // The goal is one callback per user action. touchend is best for "tap".
            return;
        }
        callback(event);
    };
    if (isTouchDevice) {
        element.addEventListener('touchend', (event) => {
            // We only care about single touches that are ending.
            if (event.changedTouches.length === 1) {
                callback(event); // This is our "tap"
                tapFlag = true;
                setTimeout(() => {
                    tapFlag = false;
                }, 300); // Window to ignore subsequent emulated click
            }
        }, { passive: false }); // passive: false as callback might do anything
        // Add the click listener to catch:
        // 1. Real mouse clicks on hybrid devices.
        // 2. To prevent emulated clicks after touchend (handled by tapFlag).
        element.addEventListener('click', clickHandler);
    }
    else {
        // Non-touch device, only listen for clicks
        element.addEventListener('click', clickHandler);
    }
}
