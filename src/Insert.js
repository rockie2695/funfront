import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Checkbox } from "semantic-ui-react"
import './App.css';

class Insert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      text: ""
    }
  }
  changeText(text) {
    if (this.state.text !== text) {
      this.setState({ text: text })
    }
  }
  changeToLoad() {
    if (this.state.text !== "") {
      this.setState({ loading: "loading" })
      console.log(this.state.text)
      fetch('http://localhost:8080/insert/character', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name": this.state.text
        })
      })
        .then(res => res.json())
        .then((result) => {
          console.log(result)
        }, (error) => {
          console.log(error)
          alert(error)
        }).then(() => {
          this.setState({ loading: null })
        });
    }
  }

  render() {
    return (
      <div>
        <Button.Group widths='2'>
          <Button onClick={() => this.props.history.push(`${this.props.match.url}/character`)}>character</Button>
          <Button onClick={() => this.props.history.push(`${this.props.match.url}/skill`)}> skill</Button>
        </Button.Group>
        <Form className={this.state.loading}>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Name' required onChange={(event) => { this.changeText(event.target.value) }} />
          </Form.Field>
          <Button type='submit' onClick={() => { this.changeToLoad() }}>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default Insert;
