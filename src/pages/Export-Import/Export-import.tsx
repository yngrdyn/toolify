import React from 'react';
import './Export-import.css';
import { ActionType, MessageType } from '../../core/types';
import { Button, Form, Input } from 'antd';

export const ExportImport: React.FC<{}> = () => {

  let config: string;

  const onExportConfig = () => {
    chrome.runtime.sendMessage({ type: ActionType.TOOLS_STATUS });
    chrome.runtime.onMessage.addListener((message: MessageType) => {
      if(message.type == ActionType.TOOLS) {
        navigator.clipboard.writeText(JSON.stringify(message.tools));
      }
    });
  };

  const onImportConfig = () => {
    const tools = JSON.parse(config);
    chrome.runtime.sendMessage({ type: ActionType.IMPORT_TOOLS, tools });
  };

  const onValueChange = (e: any) => {
    config = e.target.value;
  };

  return (
    <div className="App-add">
      <header className="App-header">
        <Button
          className="add-button"
          onClick={onExportConfig}
        >Export configuration</Button>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Paste configuration to Import"
            name="exportValue"
            rules={[{ required: true, message: 'Please input your configuration!' }]}
          >
            <Input.TextArea onChange={onValueChange} />
          </Form.Item>
        </Form>
        <Button
          className="add-button"
          onClick={onImportConfig}
        >Import configuration</Button>
      </header>
    </div>
  );
};

export default ExportImport;
