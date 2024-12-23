/**
 *  Copyright 2020 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

let numErrors = 0;

function $(id) {
  return document.getElementById(id);
}

// Return the Nordic primary Bluetooth service for Espruino devices.
function getEspruinoPrimaryService() {
  // The Nordic UART Service (NUS) UUID.
  // https://developer.nordicsemi.com/nRF_Connect_SDK/doc/latest/nrf/include/bluetooth/services/nus.html
  return '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
}

function logInfo(msg) {
  const status = $('status');
  const br = document.createElement('br');
  const text = document.createTextNode(msg);
  status.appendChild(br);
  status.appendChild(text);
  console.log(msg);
}

function logError(msg) {
  numErrors += 1;
  const status = $('status');
  const br = document.createElement('br');
  const text = document.createTextNode(msg);
  status.appendChild(br);
  status.appendChild(text);
  console.error(msg);
}

function clearStatus() {
  numErrors = 0;
  $('status').innerHTML = '';
  let result = $('test_result');
  result.innerHTML = '';
  result.classList.remove('pass');
  result.classList.remove('fail');
}

function isBluetoothSupported() {
  return navigator.bluetooth !== undefined;
}

function testDone() {
  let result = $('test_result');
  if (numErrors) {
    result.innerHTML = 'FAIL';
    result.classList.add('fail');
  } else {
    result.innerHTML = 'PASS';
    result.classList.add('pass');
  }
}

window.onerror = function() {
  // An uncaught exception. Increment the error count to ensure the test fails.
  numErrors += 1;
  testDone();
}

function assertEquals(expected, observed, opt_message) {
  if (observed === expected)
    return;
  let message = `Assertion Failed. Observed: ${observed}, Expected: ${expected}`;
  if (opt_message) {
    message = message + `, ${opt_message}`;
  }
  throw message;
}

function assertTrue(observed, opt_message) {
  assertEquals(true, observed, opt_message);
}

function assertFalse(observed, opt_message) {
  assertEquals(false, observed, opt_message);
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}