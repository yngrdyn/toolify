import { insertTextAtCursor } from './modules/insertText';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data) {
      insertTextAtCursor(request.data);
  }
});
