import { ActionType, Tool } from '../../core/types';

export const setTools = (newTools: Tool[]) => {
  chrome.storage.local.set({ tools: newTools });
  sendToolsStatus(newTools);
  return newTools;
};

export const sendToolsStatus = (tools: Tool[]) => {
  chrome.runtime.sendMessage({ type: ActionType.TOOLS, tools });
};
