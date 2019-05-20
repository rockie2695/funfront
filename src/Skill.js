import React, { Component } from 'react';
import { Button, Form, Table, Divider, Header, Placeholder, Segment } from "semantic-ui-react"
import EachSkill from "./EachSkill"
var host = 'http://localhost:8088'
class Skill extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            inputLoading: null,
            text: "",
            skills: [],
            nonehide: "hide"
        }
        this.delete = this.delete.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
        this.find()
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
    delete(_id) {
        fetch(host + '/delete/skill', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "_id": _id
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (this._isMounted) {
                    if (typeof result.ok != "undefined" && result.ok === 1) {
                        this.setState(prevState => ({ skills: prevState.skills.filter(skill => skill._id !== _id) }));
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
                    if (this.state.skills.length === 0) {
                        this.setState({ nonehide: null })
                    }
                }
            });
    }
    find() {
        fetch(host + '/find/skill', {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((result) => {
                if (this._isMounted) {
                    if (typeof result.ok != "undefined") {
                        let obj2 = { updateCancelHide: "hide", editHide: null, updateLoading: null }
                        var addClassDetect = function (element, index, array) {
                            return { ...element, ...obj2 }
                        };
                        result.ok = result.ok.map(addClassDetect);
                        this.setState(prevState => ({ skills: [...result.ok, ...prevState.skills], findLoading: "hide" }))
                        if (result.ok.length === 0) {
                            this.setState({ nonehide: null })
                        }
                    } else if (typeof result.error != "undefined") {
                        console.log(result.error)
                        alert(result.error.name + ":" + result.error.errorLabels)
                    } else {
                        alert("unknow error")
                    }
                }
            }, (error) => {
                if (this._isMounted) {
                    console.log(error)
                }
            })
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
                <Table attached='top' celled selectable>
                    <SkillTableHeader />
                    <Table.Body>
                        {this.state.skills.map((skill) =>
                            <EachSkill key={skill._id}
                                value={skill} delete={this.delete}/* update={this.update} edit={this.edit} cancelUpdate={this.cancelUpdate} */ />
                        )}
                    </Table.Body>
                </Table>
                <NoneTable nonehide={this.state.nonehide} />

                <FindLoadTable findLoading={this.state.findLoading} />
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

function SkillTableHeader() {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>LV</Table.HeaderCell>
                <Table.HeaderCell>UseMana</Table.HeaderCell>
                <Table.HeaderCell>time</Table.HeaderCell>
                <Table.HeaderCell>type</Table.HeaderCell>
                <Table.HeaderCell>description</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )
}
function FindLoadTable(props) {
    return (
        <Table attached selectable className={props.findLoading}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell><Placeholder style={{ backgroundColor: "undefined" }} fluid><Placeholder.Line style={{ backgroundColor: "rgba(0,0,0,0)" }} /></Placeholder></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
function NoneTable(props) {
    return (
        <Table attached selectable className={props.nonehide}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>None</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
export default Skill;