import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { ActionType, MessageType, Tool, ToolTypes } from '../../core/types';
import { Button, Switch } from 'antd';

const Popup: React.FC<{}> = () => {

  const Tool = (params: any) => {
    const tool: Tool = params.data;
    return (
      <div className="action">
        <Switch checked={tool.enabled} />
        <span>{tool.name}</span>
      </div>
    );
  }

  const [tools, setTools] = React.useState<Tool[]>([]);

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: ActionType.TOOLS_STATUS });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      console.log(message);
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
      left: (screen.width / 2) - (400 / 2),
      top: (screen.height / 2) - (600 / 2),
    };
    onClear();
    chrome.windows.create({ 'url': 'add.html', 'type': 'popup', width: popupOptions.width, height: popupOptions.height, left: popupOptions.left, top: popupOptions.top });
    //chrome.runtime.sendMessage({ type: ActionType.ADD_TOOL, tool: { name: Math.random().toString(), enabled: true, value: "asdasdd", type: ToolTypes.PASTE } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button className="add-button" onClick={onAddTool}>
          Add tool
        </Button>
        <h2 className="title">Current Tools</h2>
        <div className="action-list">
          {
            tools.map(
              tool => <Tool data={tool}></Tool>
            )
          }
        </div>
      </header>
    </div>
  );
};

export default Popup;
