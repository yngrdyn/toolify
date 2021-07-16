import { insertTextAtCursor, showConfetti } from './modules/insertText';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('llega el mensaje de paste');
  if (request.data) {
    insertTextAtCursor(request.data);
    showConfetti();
  }
});
