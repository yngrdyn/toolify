import React from 'react';

import { Button, Form, Input, Select } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';
import { v4 as uuidv4 } from 'uuid';
import { ActionType, Tool } from '../../core/types';
import './Add.css';

// TODO: Below commented casting does not let pass properties
export const Add /*: React.FC<{}> */ = (props: any) => {
  const [form] = Form.useForm();

  const initializeForm = () => {
    form.setFieldsValue({
      name: '',
      type: 'PASTE',
      value: '',
    });
  };

  console.log('add tools -> ', props.tools);

  initializeForm();

  const isThereAnyToolWithSameName = (name: string) => {
    return props.tools.some(
      (tool: Tool) =>
        tool.name.trim().toLocaleLowerCase() == name.trim().toLocaleLowerCase(),
    );
  };

  const isNewToolValid = (formValues: any) => {
    return (
      formValues.name.trim().length > 0 &&
      formValues.type.trim().length > 0 &&
      !isThereAnyToolWithSameName(formValues.name)
    );
  };

  const onAddTool = (formValues: any) => {
    if (isNewToolValid(formValues)) {
      chrome.runtime.sendMessage({
        type: ActionType.ADD_TOOL,
        tool: {
          id: uuidv4(),
          name: formValues.name,
          type: formValues.type as valueType,
          value: formValues.value,
          enabled: true,
        },
      });
      chrome.windows.getLastFocused((window) => {
        window.focused = true;
      });

      initializeForm();
    }
  };
  
  const onValueChange = (e: { target: { value: string } }) => {
    //state.value = e.target.value;
  };

  const validateName = (
    rule: any,
    value: string,
    cb: (msg?: string) => void,
  ) => {
    isThereAnyToolWithSameName(value)
      ? cb('There is already configured a tool with this name!')
      : cb();
  };

  return (
    <div className="App-add">
      <header className="App-header">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onAddTool}
        >
          <Form.Item
            label="Tool label"
            name="name"
            rules={[
              { required: true, message: 'Please input the tool label!' },
              { validator: validateName },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tool type"
            name="type"
            rules={[{ required: true, message: 'Please select your type!' }]}
          >
            <Select value="PASTE">
              <Select.Option value="PASTE">Paste</Select.Option>
              <Select.Option value="SEARCH">Search</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="What should I paste?"
            name="value"
            rules={[{ required: true, message: 'Please input your value!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Button className="add-button" htmlType="submit">
            Add tool
          </Button>
        </Form>
      </header>
    </div>
  );
};
