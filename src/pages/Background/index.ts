import { ActionType, MessageType, Tool, ToolTypes } from '../../core/types';
import { addToolToMenu } from './menu';
import { sendToolsStatus, setTools } from './tools';

const defaultTool: Tool = {
  enabled: true,
  id: '1',
  name: 'Search in Dynatrace Wiki',
  type: ToolTypes.SEARCH,
  value: 'https://dev-wiki.dynatrace.org/dosearchsite.action?cql=siteSearch+~+',
};

let tools: Tool[] = [];
let ready = false;

// Get locally stored value
chrome.storage.local.get('tools', (res) => {
  tools = res['tools'] ?? [];
  ready = true;
  sendToolsStatus(tools);
  [defaultTool, ...tools].forEach((tool: Tool) => {
    addToolToMenu(tool);
  });
});

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case ActionType.TOOLS_STATUS:
      if (ready) sendToolsStatus(tools);
      break;
    case ActionType.ADD_TOOL:
      const newTools = [...tools, message.tool];
      tools = setTools(newTools);
      addToolToMenu(message.tool);
      break;
    case ActionType.DELETE_TOOL:
      tools = setTools(tools.filter((tool) => tool.id !== message.id));
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
      setTools(tools.concat(message.tools));
      break;
    default:
      break;
  }
});
