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

interface TooleEdition {
  type: ActionType.EDIT_TOOL;
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

export type MessageType =
  | ToolStatusRequest
  | ToolsStatus
  | ToolActions
  | TooleEdition
  | ToolDeletion
  | ToolChangeStatus
  | ImportTools;

export enum ActionType {
  TOOLS_STATUS = 'TOOLS_STATUS',
  TOOLS = 'TOOLS',
  ADD_TOOL = 'ADD_TOOL',
  EDIT_TOOL = 'EDIT_TOOL',
  DELETE_TOOL = 'DELETE_TOOL',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CLEAR = 'CLEAR',
  IMPORT_TOOLS = 'IMPORT_TOOLS',
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
