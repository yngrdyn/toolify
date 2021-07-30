import React from 'react';
import './Popup.css';
import { ActionType, MessageType, Tool } from '../../core/types';
import { Button, Collapse, Switch, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Add } from '../Add/Add';
import './Popup.css';
import { ExportImport } from '../Export-Import/Export-import';
const { Panel } = Collapse;

const openAddToolPanel = (): void => {
  (document.querySelectorAll('.ant-collapse-header')[1] as HTMLElement).click();
};

const Popup: React.FC<{}> = () => {
  const Tool = (params: any) => {
    const tool: Tool = params.data;

    const onDeleteHandler = () => {
      if (toolInEdition?.id === tool.id) {
        updateToolHandler();
      }

      chrome.runtime.sendMessage({
        type: ActionType.DELETE_TOOL,
        id: tool.id,
      });
    };

    const onEditHandler = (): void => {
      if (!toolInEdition) {
        openAddToolPanel();
      }
      setToolInEdition(tools.find((_tool) => _tool.id === tool.id));
    };

    const onSwitchHandler = () => {
      chrome.runtime.sendMessage({
        type: ActionType.CHANGE_STATUS,
        id: tool.id,
        enabled: !tool.enabled,
      });
    };

    return (
      <div className="action">
        <div>
          <Switch checked={tool.enabled} onClick={onSwitchHandler} />
          <span>{tool.name}</span>
        </div>
        <div>
          <Tooltip title="edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={onEditHandler}
            />
          </Tooltip>
          &nbsp;
          <Tooltip title="delete">
            <Button
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={onDeleteHandler}
            />
          </Tooltip>
        </div>
      </div>
    );
  };

  const updateToolHandler = (): void => {
    openAddToolPanel();
    setToolInEdition(undefined);
  };

  const [tools, setTools] = React.useState<Tool[]>([]);
  const [toolInEdition, setToolInEdition] = React.useState<Tool | undefined>();

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: ActionType.TOOLS_STATUS });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      console.log('message.type -> ', message.type);
      switch (message.type) {
        case ActionType.TOOLS:
          setTools(message.tools);
          break;
        // TODO: Why below action is never dispatched?
        // case ActionType.EDIT_TOOL:
        //   setToolInEdition(undefined);
        //   break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Collapse defaultActiveKey={['tools']}>
          <Panel header="Current Tools" key="tools">
            <div className="action-list">
              {tools.map((tool) => (
                <Tool data={tool} key={tool.id}></Tool>
              ))}
              {tools.length == 0 && (
                <div className="no-tools">
                  <p>There are no tools 🥺!</p>
                  <p>
                    Start by creating a new one <span>😎</span>
                  </p>
                </div>
              )}
            </div>
          </Panel>
          <Panel
            header={toolInEdition ? 'Edit tool' : 'Add new tool'}
            key="add"
          >
            <Add
              tools={tools}
              toolInEdition={toolInEdition}
              onUpdateTool={updateToolHandler}
            />
          </Panel>
          <Panel header="Export/Import configuration" key="export">
            <ExportImport />
          </Panel>
        </Collapse>
      </header>
    </div>
  );
};

export default Popup;
