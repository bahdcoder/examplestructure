var wsUri = "ws://127.0.0.1:3333/adonis-ws";
var output;

function init() {
  testWebSocket();
}

function testWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function (evt) { onOpen(evt) };
  websocket.onclose = function (evt) { onClose(evt) };
  websocket.onmessage = function (evt) { onMessage(evt) };
  websocket.onerror = function (evt) { onError(evt) };
}

function onOpen(evt) {
  console.log("CONNECTED");
  doSend(JSON.stringify({ 't': 1, 'd': { 'topic': 'trade:group1' } }));
}

function onClose(evt) {
  console.log("DISCONNECTED");
}

function onMessage(evt) {
  console.log('RESPONSE: ' + evt.data);
  doSend(JSON.stringify({ "t": 7, "d": { "topic": "trade:group1", "event": "message", "data": { "username": "abhishek", "body": "hel" } } }));
}

function onError(evt) {
  console.log('ERROR: ' + evt.data);
}

function doSend(message) {
  websocket.send(message);
}

function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

window.addEventListener("load", init, false);