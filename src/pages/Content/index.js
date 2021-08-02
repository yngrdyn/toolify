import { insertTextAtCursor, showConfetti } from './modules/insertText';

console.log('%c Toolify Loaded ', 'color: #bada55');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('menu item clicked', request);
  if (request.data) {
    insertTextAtCursor(request.data);
    showConfetti();
  }
});
