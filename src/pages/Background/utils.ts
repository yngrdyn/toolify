import { searchWiki } from './actions';

export const initialize = (): void => {
  chrome.contextMenus.create({
    id: '1',
    title: 'Search in Dynatrace Wiki',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener(
    (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
      if (info.menuItemId === 1) {
        searchWiki(info);
      }
    }
  );
};
