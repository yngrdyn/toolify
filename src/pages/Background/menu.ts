import { Tool, ToolTypes } from '../../core/types';
import { paste, searchWiki } from './actions';
import { getToolById } from './utils';

export const clearTools = () => {
  chrome.contextMenus.removeAll();
};

export const addToolToMenu = (tool: Tool) => {
  chrome.contextMenus.create({
    id: `${tool.id}`,
    title: `${tool.name}`,
    contexts: tool.type === ToolTypes.PASTE ? ['editable'] : ['selection'],
  });
};

export const getAction = (
  toolId: string,
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab
) => {
  const tool = getToolById(toolId) as Tool;
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
