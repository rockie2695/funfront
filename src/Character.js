import React, { Component } from 'react';
import { Button, Form, Table, Divider, Header, Placeholder, Segment } from "semantic-ui-react"
import EachCharacter from "./EachCharacter"
var host = 'http://localhost:8088'
class Character extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            inputLoading: null,
            deleteLoading: null,
            text: "",
            characters: [],
            findLoading: null,
            nonehide: "hide"
        }
        this.changeText = this.changeText.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)
        this.find = this.find.bind(this)
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
        }
    }
    insert() {
        if (this.state.text !== "") {
            this.setState({ inputLoading: "loading" })
            fetch(host + '/insert/character', {
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
                            this.setState(prevState => ({ characters: [result.ok, ...prevState.characters,] }))
                            this.setState({ text: "" })
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
    edit(_id) {//https://stackoverflow.com/questions/54382559/how-to-set-state-for-a-specific-object-in-an-array-in-react
        this.setState(prev => ({
            characters: prev.characters.map(character => character._id === _id ? { ...character, updateCancelHide: null, editHide: "hide" } : character)
        }))
        //other answer https://stackoverflow.com/questions/29537299/react-how-do-i-update-state-item1-on-setstate-with-jsfiddle
    }
    cancelUpdate(_id) {
        this.setState(prev => ({
            characters: prev.characters.map(character => character._id === _id
                ? { ...character, updateCancelHide: "hide", editHide: null } : character)
        }))
    }
    update(updateCharacter) {
        console.log(updateCharacter)
        this.setState((prev) => ({
            characters: prev.characters.map(character => character._id === updateCharacter._id ? { ...character, updateLoading: "loading" } : character)
        }))
        let query = {
            lv: updateCharacter.lv,
            blood: updateCharacter.blood,
            mana: updateCharacter.mana,
            phy: updateCharacter.phy,
            magic: updateCharacter.magic,
            soul: updateCharacter.soul
        }
        let whereCon = { "_id": updateCharacter._id }
        fetch(host + '/update/character', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "query": query,
                "whereCon": whereCon
            })
        })
            .then(res => res.json())
            .then((result) => {
                if (typeof result.ok != "undefined") {
                    //this.setState(prevState => ({ characters: [result.ok, ...prevState.characters] }))
                    console.log(result.ok)
                    let newCharacter = result.ok
                    this.setState((prev) => ({
                        characters: prev.characters.map(character => character._id === newCharacter._id ? { ...character, updateCancelHide: "hide", editHide: null, updateLoading: null, ...newCharacter } : character)
                    }))
                    console.log(this.state.characters)
                } else if (typeof result.error != "undefined") {
                    console.log(result.error)
                    alert(result.error)
                } else {
                    alert("unknow error")
                }
            }, (error) => {
                if (this._isMounted) {
                    console.log(error)
                    alert(error)
                }
            })
    }
    delete(_id) {
        fetch(host + '/delete/character', {
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
                        this.setState(prevState => ({ characters: prevState.characters.filter(character => character._id !== _id) }));
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
                    if (this.state.characters.length === 0) {
                        this.setState({ nonehide: null })
                    }
                }
            });
    }
    find() {
        fetch(host + '/find/character', {
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
                        this.setState(prevState => ({ characters: [...result.ok, ...prevState.characters], findLoading: "hide" }))
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
                Character
            </Header>
            <Segment>
                <Divider horizontal>
                    <Header as='h3'>
                        Table
                </Header>
                </Divider>
                <Table attached='top' celled selectable>
                    <CharTableHeader />
                    <Table.Body>
                        {this.state.characters.map((character) =>
                            <EachCharacter key={character._id}
                                value={character} delete={this.delete} update={this.update} edit={this.edit} cancelUpdate={this.cancelUpdate} />
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
                        <input placeholder='Name' required value={this.state.text} onChange={this.changeText} />
                    </Form.Field>
                    <Button type='submit' onClick={() => { this.insert() }}>Submit</Button>
                </Form>
            </Segment>
        </div>
        )
    }
}
function CharTableHeader() {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>LV</Table.HeaderCell>
                <Table.HeaderCell>NonUse pt</Table.HeaderCell>
                <Table.HeaderCell>Use pt</Table.HeaderCell>
                <Table.HeaderCell>blood</Table.HeaderCell>
                <Table.HeaderCell>mana</Table.HeaderCell>
                <Table.HeaderCell>phy</Table.HeaderCell>
                <Table.HeaderCell>magic</Table.HeaderCell>
                <Table.HeaderCell>soul</Table.HeaderCell>
                <Table.HeaderCell>DateTime</Table.HeaderCell>
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
export default Character;