import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Checkbox } from "semantic-ui-react"
import './App.css';
import 'semantic-ui-css/semantic.min.css'

class Insert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      text: ""
    }
  }
  changeText(text) {
    if (this.state.text != text) {
      this.setState({ text: text })
      console.log(text)
    }
  }
  changeToLoad() {
    if (this.state.text != "") {
      this.setState({ loading: "loading" })
    }
  }

  render() {
    return (
      <div>
        <Button.Group widths='2'>
          <Button>character</Button>
          <Button>skill</Button>
        </Button.Group>
        <Form className={this.state.loading}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='First Name' required onChange={(event) => { this.changeText(event.target.value) }} />
          </Form.Field>
          <Button type='submit' onClick={() => { this.changeToLoad() }}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default Insert;
