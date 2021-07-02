interface ToolStatusRequest {
  type: ActionType.TOOLS_STATUS | ActionType.CLEAR;
}

interface ToolsStatus {
  type: ActionType.TOOLS;
  tools: Tool[];
}

interface ToolActions {
  type: ActionType.ADD_TOOL;
  tool: Tool;
}

export type MessageType = ToolStatusRequest | ToolsStatus | ToolActions;

export enum ActionType {
  TOOLS_STATUS = 'TOOLS_STATUS',
  TOOLS = 'TOOLS',
  ADD_TOOL = 'ADD_TOOL',
  CLEAR = 'CLEAR',
}

export enum ToolTypes {
  PASTE = "PASTE",
}

export interface Tool {
  name: string;
  value: string;
  type: ToolTypes;
  enabled: boolean;
}
