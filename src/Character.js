import React, { Component } from 'react';
import { Button, Form, Container, Segment, List, Table } from "semantic-ui-react"
import EachCharacter from "./EachCharacter"
import className from "classnames"
var host='http://localhost:8080'
class Character extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            inputLoading: null,
            deleteLoading: null,
            text: "",
            characters: [{ _id: 123, name: 777, lv: 0, mana: 0, blood: 0, phy: 0, soul: 0, time: 0, magic: 0, updateCancelHide: "hide", editHide: null, updateLoading: null }]
        }
        this.changeText = this.changeText.bind(this)
        this.delete = this.delete.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    changeText(event) {
        if (this.state.text !== event.target.value) {
            this.setState({ text: event.target.value })
        }
    }
    changeToLoad() {
        if (this.state.text !== "") {
            this.setState({ inputLoading: "loading" })
            fetch(host+'/insert/character', {
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
                    console.log(error)
                    alert(error)
                }).then(() => {
                    if (this._isMounted) {
                        this.setState({ inputLoading: null })
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
                ? { ...character, updateCancelHide: "hide", editHide: null/*, lv: character.lv, blood: character.blood, mana: character.mana, phy: character.phy, magic: character.magic, soul: character.soul */ } : character)
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
        fetch(host+'/update/character', {
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
                console.log(error)
                alert(error)
            })
    }
    delete(_id) {
        fetch(host+'/delete/character', {
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
                console.log(error)
                alert(error)
            })
    }

    render() {
        return (<div>
            <Table attached celled selectable>
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
                <Table.Body>
                    {this.state.characters.map((character) =>
                        <EachCharacter key={character._id}
                            value={character} delete={this.delete} update={this.update} edit={this.edit} cancelUpdate={this.cancelUpdate} />
                    )}
                </Table.Body>

            </Table>

            <Form className={this.state.inputLoading}>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' required value={this.state.text} onChange={this.changeText} />
                </Form.Field>
                <Button type='submit' onClick={() => { this.changeToLoad() }}>Submit</Button>
            </Form>
        </div>
        )

    }
}

export default Character;