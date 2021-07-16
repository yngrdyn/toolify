import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

function insertTextAtCursor(text) {
  var el = document.activeElement;
  var val = el.value;
  var endIndex;
  var range;
  var doc = el.ownerDocument;
  if (
    typeof el.selectionStart === 'number' &&
    typeof el.selectionEnd === 'number'
  ) {
    endIndex = el.selectionEnd;
    el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
    el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (doc.selection !== 'undefined' && doc.selection.createRange) {
    el.focus();
    range = doc.selection.createRange();
    range.collapse(false);
    range.text = text;
    range.select();
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data) {
      insertTextAtCursor(request.data);
  }
});
