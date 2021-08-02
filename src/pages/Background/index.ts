import { ActionType, MessageType, Tool, ToolTypes } from '../../core/types';
import { addToolToMenu, clearTools, getAction } from './menu';
import { sendToolsStatus, setTools } from './tools';
import { loadToolsFromStorage, showWarning } from './utils';

let tools: Tool[] = [];
let ready = false;

loadToolsFromStorage().then((newTools) => {
  ready = true;
  tools = newTools;
});

chrome.contextMenus.onClicked.addListener(
  (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
    console.log('context menu clicked');
    getAction(info.menuItemId, info, tab);
  }
);

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case ActionType.TOOLS_STATUS:
      if (ready) sendToolsStatus(tools);
      break;
    case ActionType.ADD_TOOL:
      const newTools = [...tools, message.tool];
      tools = setTools(newTools);
      addToolToMenu(message.tool);
      loadToolsFromStorage();
      showWarning();
      break;
    case ActionType.DELETE_TOOL:
      tools = setTools(tools.filter((tool) => tool.id !== message.id));
      loadToolsFromStorage();
      showWarning();
      break;
    case ActionType.CHANGE_STATUS:
      const newChangedTools = tools.map((tool) =>
        tool.id === message.id
          ? {
              ...tool,
              enabled: message.enabled,
            }
          : tool
      );
      tools = setTools(newChangedTools);
      break;
    case ActionType.CLEAR:
      tools = setTools([]);
      break;
    case ActionType.IMPORT_TOOLS:
      tools = setTools(tools.concat(message.tools));
      loadToolsFromStorage();
      showWarning();
      break;
    default:
      break;
  }
});
