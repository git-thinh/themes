var endpoint;

// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js')
.then(function(registration) {
  // Use the PushManager to get the user's subscription to the push service.
  return registration.pushManager.getSubscription()
  .then(function(subscription) {
    // If a subscription was found, return it.
    if (subscription) {
      return subscription;
    }

    // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
    // send notifications that don't have a visible effect for the user).
    return registration.pushManager.subscribe({ userVisibleOnly: true });
  });
}).then(function(subscription) {
  endpoint = subscription.endpoint;

  // Send the subscription details to the server using the Fetch API.
  fetch('./register', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: subscription.endpoint,
    }),
  });
});

document.getElementById('doIt').onclick = function() {
  var payload = document.getElementById('notification-payload').value;
  var delay = document.getElementById('notification-delay').value;
  var ttl = document.getElementById('notification-ttl').value;

  // Ask the server to send the client a notification (for testing purposes, in actual
  // applications the push notification is likely going to be generated by some event
  // in the server).
  fetch('./sendNotification', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      endpoint: endpoint,
      payload: payload,
      delay: delay,
      ttl: ttl,
    }),
  });
};
