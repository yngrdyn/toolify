import React from 'react';
import { Switch } from 'antd';
import './Popup.css';

const Test = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Current Tools</h2>
        <Actions></Actions>
      </header>
    </div>
  );
};

const Actions = () => {
  return (
    <div className="action-list">
      {
        actions.map(
          action => <Action data={action}></Action>
        )
      }
    </div>
  );
}

const Action = (params: any) => {
  const action = params.data;
  return (
    <div className="action">
      <Switch checked={action.enabled} />
      <span>{action.name}</span>
    </div>
  );
}

enum ActionTypes {
  paste = 1
}

interface Action {
  name: string;
  type: ActionTypes;
  value: any;
  enabled: boolean;
}

const actions: Action[] = [
  {
    name: "PR Story",
    type: ActionTypes.paste,
    value: "ajsdjadjlkasdlaksd",
    enabled: true
  },
  {
    name: "PR Bug",
    type: ActionTypes.paste,
    value: "ajsdjadjlkasdlaksd",
    enabled: true
  },
  {
    name: "Search on Wiki",
    type: ActionTypes.paste,
    value: "ajsdjadjlkasdlaksd",
    enabled: true
  }
]

export default Test;