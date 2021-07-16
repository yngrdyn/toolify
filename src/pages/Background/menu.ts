import { Tool } from '../../core/types';
import { paste } from './actions';

export const addToolToMenu = (tool: Tool) => {
  chrome.contextMenus.create({
    id: `${tool.id}`,
    title: `${tool.name}`,
    contexts: ['editable'],
  });
  chrome.contextMenus.onClicked.addListener(
    (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
      if (info.menuItemId === tool.id) {
        paste(info, tool.value, tab);
      }
    }
  );
};
