import { Tool, ToolTypes } from '../../core/types';
import { paste, searchWiki } from './actions';

export const addToolToMenu = (tool: Tool) => {
  chrome.contextMenus.create({
    id: `${tool.id}`,
    title: `${tool.name}`,
    contexts: tool.type === ToolTypes.PASTE ? ['editable'] : ['selection'],
  });
  chrome.contextMenus.onClicked.addListener(
    (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
      if (info.menuItemId === tool.id) {
        getAction(tool, info, tab);
      }
    }
  );
};

const getAction = (
  tool: Tool,
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
) => {
  switch (tool.type) {
    case ToolTypes.PASTE:
      paste(info, tool.value, tab);
      break;
    case ToolTypes.SEARCH:
      searchWiki(tool.value, info);
      break;
    default:
      break;
  }
};
