export function messageData($q, $rootScope, $timeout) {
  // We return this object to anything injecting our service
  const Service = {};
  // Keep all pending requests here until they get responses
  const callbacks = {};
  // Create a unique callback ID to map requests to responses
  let currentCallbackId = 0;
  // Create our websocket object with the address to the websocket
  const ws = new WebSocket('ws://localhost:3001/socket/');
  ws.onmessage = function (message) {
    listener(angular.fromJson(message.data));
  };

  function sendRequest(request) {
    const defer = $q.defer();
    const callbackId = getCallbackId();
    callbacks[callbackId] = {
      time: new Date(),
      cb: defer
    };

    request.callbackId = callbackId;

    ws.send(angular.toJson(request));
    return defer.promise;
  }

  function listener(data) {
    const messageObj = data;
    // If an object exists with callback_id in our callbacks object, resolve it
    if (Object.prototype.hasOwnProperty.call(messageObj.callbackId, 'callbacks')) {
      $rootScope.$apply(callbacks[messageObj.callbackId].cb.resolve(messageObj.data));
      delete callbacks[messageObj.callbackID];
    }
  }
  // This creates a new callback ID for a request
  function getCallbackId() {
    currentCallbackId += 1;
    if (currentCallbackId > 10000) {
      currentCallbackId = 0;
    }
    return currentCallbackId;
  }

  function waitForConnection(callback, interval) {
    if (ws.readyState === 1) {
      callback();
    } else {
      $timeout(() => {
        waitForConnection(callback, interval);
      }, interval);
    }
  }

  // Define a "getter" for getting customer data
  Service.getMessages = function () {
    const request = {
      type: 'get_messages'
    };
    // Storing in a variable for clarity on what sendRequest returns
    return waitForConnection(() => {
      const promise = sendRequest(request);
      return promise;
    }, 1000);
  };

  return Service;
}
