import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { ActionType, MessageType, Tool } from '../../core/types';

const Popup: React.FC<{}> = () => {
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

  const onAddTool = () => {
    chrome.runtime.sendMessage({ type: ActionType.ADD_TOOL, tool: { name: Math.random().toString() } });
  };

  const onClear = () => {
    chrome.runtime.sendMessage({ type: ActionType.CLEAR });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Toolify</h1>
        <button onClick={onAddTool}>
          Add tool
        </button>
        { tools.length > 0
          && <button onClick={onClear}>
              Clear
            </button> }
        { tools.map(tool => <li>{ tool.name }</li>) }
      </header>
    </div>
  );
};

export default Popup;
