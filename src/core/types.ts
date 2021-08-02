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
  id: string;
}

interface ToolChangeStatus {
  type: ActionType.CHANGE_STATUS;
  id: string;
  enabled: boolean;
}

interface ImportTools {
  type: ActionType.IMPORT_TOOLS;
  tools: Tool[];
}

interface Warning {
  type: ActionType.WARNING;
  message: string;
}

export type MessageType =
  | ToolStatusRequest
  | ToolsStatus
  | ToolActions
  | ToolDeletion
  | ToolChangeStatus
  | ImportTools
  | Warning;

export enum ActionType {
  TOOLS_STATUS = 'TOOLS_STATUS',
  TOOLS = 'TOOLS',
  ADD_TOOL = 'ADD_TOOL',
  DELETE_TOOL = 'DELETE_TOOL',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CLEAR = 'CLEAR',
  IMPORT_TOOLS = 'IMPORT_TOOLS',
  WARNING = 'WARNING',
}

export enum ToolTypes {
  PASTE = 'PASTE',
  SEARCH = 'SEARCH',
}

export interface Tool {
  id: string;
  name: string;
  value: string;
  type: ToolTypes;
  enabled: boolean;
}
