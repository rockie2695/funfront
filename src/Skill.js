import React, { Component } from 'react';
import { Button, Form, Table, Divider, Header, Placeholder, Segment } from "semantic-ui-react"
var host = 'http://localhost:8088'
class Skill extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            inputLoading: null,
            text: "",
            skills: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        //this.find()
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    changeText(event) {
        if (this.state.text !== event.target.value) {
            this.setState({ text: event.target.value })
            console.log(this.state.text)
        }
    }
    insert() {
        if (this.state.text !== "") {
            this.setState({ inputLoading: "loading" })
            fetch(host + '/insert/skill', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "name": this.state.text
                })
            })
                .then(res => res.json())
                .then((result) => {
                    if (this._isMounted) {
                        if (typeof result.ok != "undefined") {
                            result.ok.updateCancelHide = "hide"
                            result.ok.editHide = null
                            result.ok.updateLoading = null
                            this.setState(prevState => ({ skills: [result.ok, ...prevState.skills,] }))
                            this.setState({ text: "" })
                            console.log(this.state.skills)
                        } else if (typeof result.error != "undefined") {
                            console.log(result.error)
                            alert(result.error)
                        } else {
                            alert("unknow error")
                        }
                    }
                }, (error) => {
                    if (this._isMounted) {
                        console.log(error)
                        alert(error)
                    }
                }).then(() => {
                    if (this._isMounted) {
                        this.setState({ inputLoading: null, nonehide: "hide" })
                    }
                });
        }
    }
    render() {
        return (<div>
            <Header as='h2' textAlign='center' style={{ marginTop: "10px" }}>
                Skill
            </Header>
            <Segment >
                <Divider horizontal>
                    <Header as='h3'>
                        Table
                </Header>
                </Divider>
            </Segment>
            <Segment>
                <Divider horizontal>
                    <Header as='h3'>
                        Add
                </Header>
                </Divider>
                <Form className={this.state.inputLoading}>
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' required value={this.state.text} onChange={(e) => this.changeText(e)} />
                    </Form.Field>
                    <Button type='submit' onClick={() => { this.insert() }}>Submit</Button>
                </Form>
            </Segment>
        </div>
        )

    }
}

export default Skill;