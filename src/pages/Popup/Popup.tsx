import React from 'react';
import './Popup.css';
import { ActionType, MessageType, Tool } from '../../core/types';
import { Button, Collapse, Switch, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Add } from '../Add/Add';
import './Popup.css';
const { Panel } = Collapse;

const Popup: React.FC<{}> = () => {
  const Tool = (params: any) => {
    const tool: Tool = params.data;

    const onDeleteHandler = () => {
      chrome.runtime.sendMessage({
        type: ActionType.DELETE_TOOL,
        id: tool.id,
      });
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
    );
  };

  const [tools, setTools] = React.useState<Tool[]>([]);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: ActionType.TOOLS_STATUS });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      switch (message.type) {
        case ActionType.TOOLS:
          setTools(message.tools);
          break;
        default:
          break;
      }
    });
  }, []);

  const onClear = () => {
    chrome.runtime.sendMessage({ type: ActionType.CLEAR });
  };

  const onAddTool = () => {
    const popupOptions = {
      width: 400,
      height: 600,
      left: screen.width / 2 - 400 / 2,
      top: screen.height / 2 - 600 / 2,
    };
    onClear();
    chrome.windows.create({
      url: 'add.html',
      type: 'popup',
      width: popupOptions.width,
      height: popupOptions.height,
      left: popupOptions.left,
      top: popupOptions.top,
    });
    //chrome.runtime.sendMessage({ type: ActionType.ADD_TOOL, tool: { name: Math.random().toString(), enabled: true, value: "asdasdd", type: ToolTypes.PASTE } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Collapse defaultActiveKey={['tools']}>
          <Panel header="Current Tools" key="tools">
            <div className="action-list">
              {
                tools.map(
                  tool => <Tool data={tool} key={tool.id}></Tool>
                )
              }
              {tools.length == 0 &&
                <div className='no-tools'>
                  <p>There are no tools 🥺!</p>
                  <p>Start by creating a new one <span>😎</span></p>
                </div>
              }
            </div>
          </Panel>
          <Panel header="Add new tool" key="add">
            <Add />
          </Panel>
        </Collapse>
      </header>
    </div>
  );
};

export default Popup;
