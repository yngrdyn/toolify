import React, { useState } from 'react';
import './Popup.css';
import { ActionType, MessageType, Tool } from '../../core/types';
import { Alert, Button, Collapse, Switch, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Add } from '../Add/Add';
import './Popup.css';
import { ExportImport } from '../Export-Import/Export-import';
const { Panel } = Collapse;
import useForceUpdate from 'use-force-update';

const Popup: React.FC<{}> = () => {
  const Warning = () => {
    if (!warning) {
      console.log('warning not visible', warning);
      return null;
    }
    return (
      <Alert className="warning-message" message={warning} type="warning" />
    );
  };

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
  const [warning, setWarning] = React.useState<string>('');

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: ActionType.TOOLS_STATUS });

    chrome.runtime.onMessage.addListener((message: MessageType) => {
      console.log('message! --> ', message);
      switch (message.type) {
        case ActionType.TOOLS:
          setTools(message.tools);
          break;
        case ActionType.WARNING:
          setWarning(message.message);
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Warning />
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
          <Panel header="Add new tool" key="add">
            <Add tools={tools} />
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
