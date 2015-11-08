import WeakMap from 'weakmap';
import elementLaxMatch from 'element-lax-match';


var handlers = new Table;

function onOut(eventName, elements, handler){
    if(!Array.isArray(elements)){
        elements = [elements];
    }

    var key = {
            eventName: eventName,
            elements: elements,
            handler: handler
        },
        wrappedHandler = function(event){
            var laxMatched = elements.some(element => {
                return elementLaxMatch(event.target, element);
             });

            if(!laxMatched)
                handler(event);
        };

    handlers.set(key, wrappedHandler);

    addEventListener(eventName, wrappedHandler, false);
}

function offOut(eventName, elements, handler){
    if(!Array.isArray(elements)){
        elements = [elements];
    }

    var key = {
        eventName: eventName,
        elements: elements,
        handler: handler
    };

    removeEventListener(eventName, handlers.get(key));
    handlers.erase(key);
}

function onBlur(elements, handler){
    return onOut('mousedown', elements, handler)
}
function offBlur(elements, handler){
    return offOut('mousedown', elements, handler)
}

function onClickOut(elements, handler){
    return onOut('click', elements, handler)
}
function offClickOut(elements, handler){
    return offOut('click', elements, handler)
}

exports.onBlur = onBlur;
exports.offBlur = offBlur;
exports.onClickOut = onClickOut;
exports.offClickOut = offClickOut;
