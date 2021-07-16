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

interface ToolDeletion {
  type: ActionType.DELETE_TOOL;
  id: number;
}

interface ToolChangeStatus {
  type: ActionType.CHANGE_STATUS;
  id: number;
  enabled: boolean;
}

export type MessageType =
  | ToolStatusRequest
  | ToolsStatus
  | ToolActions
  | ToolDeletion
  | ToolChangeStatus;

export enum ActionType {
  TOOLS_STATUS = 'TOOLS_STATUS',
  TOOLS = 'TOOLS',
  ADD_TOOL = 'ADD_TOOL',
  DELETE_TOOL = 'DELETE_TOOL',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CLEAR = 'CLEAR',
}

export enum ToolTypes {
  PASTE = 'PASTE',
}

export interface Tool {
  id: number;
  name: string;
  value: string;
  type: ToolTypes;
  enabled: boolean;
}
