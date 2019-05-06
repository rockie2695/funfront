import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Linkk, Redirect, Switch } from "react-router-dom";
import { Button, Form, Checkbox } from "semantic-ui-react"
import Character from './Character'
import Skill from './Skill'

class Insert extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Button.Group widths='2'>
          <Button onClick={
            () => { if (this.props.location.pathname !== `${this.props.match.url}/character`) { this.props.history.push(`${this.props.match.url}/character`) } }}
          >character</Button>
          <Button onClick={
            () => { if (this.props.location.pathname !== `${this.props.match.url}/skill`) { this.props.history.push(`${this.props.match.url}/skill`) } }}
          >skill</Button>
        </Button.Group>
        <Switch>
          <Route path={`${this.props.match.path}/character`} component={Character} />
          <Route path={`${this.props.match.path}/skill`} component={Skill} />
          <Redirect from={this.props.match.path} to={`${this.props.match.path}/character`} />
        </Switch>
      </div>
    )
  }
}

export default Insert;
