import { ActionType, Tool, ToolTypes } from '../../core/types';
import { addToolToMenu, clearTools } from './menu';
import { sendToolsStatus, setTools } from './tools';

const defaultTool: Tool = {
  enabled: true,
  id: '1',
  name: 'Search in Dynatrace Wiki',
  type: ToolTypes.SEARCH,
  value: 'https://dev-wiki.dynatrace.org/dosearchsite.action?cql=siteSearch+~+',
};

let tools: Tool[] = [];

export const getToolById = (toolId: string) => {
  return tools.find((t) => t.id == toolId);
};

// Get locally stored value
export const loadToolsFromStorage = (): Promise<Tool[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get('tools', (res) => {
      const newTools = res['tools'] ?? [];
      clearTools();
      sendToolsStatus(newTools);
      [defaultTool, ...newTools].forEach((tool: Tool) => {
        addToolToMenu(tool);
      });
      reloadContentScript();

      tools = newTools;
      resolve(newTools);
    });
  });
};

export const showWarning = () => {
  chrome.runtime.sendMessage({
    type: ActionType.WARNING,
    message: '⚠️ You must reload the page for the tools to work',
  });
};

const reloadContentScript = () => {
  chrome.tabs.query({}, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {}
  });
};
