import { ActionType, MessageType, Tool } from '../../core/types';

const setTools = (newTools: Tool[]) => {
  chrome.storage.local.set({ tools: newTools });
  tools = newTools;
  sendToolsStatus(newTools);
};

const sendToolsStatus = (tools: Tool[]) => {
  chrome.runtime.sendMessage({ type: ActionType.TOOLS, tools });
};

let tools: Tool[] = [];

// Get locally stored value
chrome.storage.local.get('tools', (res) => {
  tools = res['tools'] ?? [];
});

chrome.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case ActionType.TOOLS_STATUS:
      sendToolsStatus(tools);
      break;
    case ActionType.ADD_TOOL:
      const newTools = [...tools, message.tool];
      setTools(newTools);
      break;
    case ActionType.DELETE_TOOL:
      setTools(tools.filter((tool) => tool.id !== message.id));
      break;
    case ActionType.CHANGE_STATUS:
      const newChangedTools = tools.map((tool) =>
        tool.id === message.id
          ? {
              ...tool,
              enabled: message.enabled,
            }
          : tool,
      );
      setTools(newChangedTools);
      break;
    case ActionType.CLEAR:
      setTools([]);
      break;
    default:
      break;
  }
});

// PoC of Right menu context
const searchWiki = (query: any) => {
  query = query.selectionText;
  chrome.tabs.create({
    url:
      'https://dev-wiki.dynatrace.org/dosearchsite.action?cql=siteSearch+~+%22' +
      query +
      '%22&queryString=' +
      query,
  });
};

chrome.contextMenus.create({
  id: '1',
  title: 'Search in Dynatrace Wiki',
  contexts: ['selection'],
});

chrome.contextMenus.onClicked.addListener((info) => {
  searchWiki(info);
});
