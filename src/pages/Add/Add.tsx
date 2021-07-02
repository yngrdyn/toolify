import React from 'react';
import './Add.css';
import { ActionType, MessageType, Tool, ToolTypes } from '../../core/types';
import { Button, Form, Input, Select, Switch } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';
import { SelectValue } from 'antd/lib/select';

const Add: React.FC<{}> = () => {

  var state = {
    name: "",
    type: "",
    value: ""
  }

  const onNameChange = (e: { target: { value: string; }; }) => {
    state.name = e.target.value;
  }

  const onTypeChange = (value: SelectValue, option: any) => {
    state.type = value?.toString() ?? "";
  }

  const onValueChange = (e: { target: { value: string; }; }) => {
    state.value = e.target.value;
  }

  const onAddTool = () => {
    chrome.runtime.sendMessage({ type: ActionType.ADD_TOOL, tool: { name: state.name, enabled: true, value: state.value, type: state.type as valueType } });
    chrome.windows.getLastFocused(window => {
      window.focused = true;
    });


  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">Add new tool</h2>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Tool label"
            name="name"
            rules={[{ required: true, message: 'Please input the tool label!' }]}
          >
            <Input onChange={onNameChange} />
          </Form.Item>

          <Form.Item
            label="Tool type"
            name="type"
            rules={[{ required: true, message: 'Please select your type!' }]}
          >
            <Select onChange={onTypeChange} defaultValue="PASTE">
              <Select.Option value="PASTE">Paste</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="What should I paste?"
            name="value"
            rules={[{ required: true, message: 'Please input your value!' }]}
          >
            <Input.TextArea onChange={onValueChange} />
          </Form.Item>
        </Form>

        <Button
          className="add-button"
          onClick={onAddTool}
        >Add tool</Button>
      </header>
    </div>
  );
};

export default Add;
