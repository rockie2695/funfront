import React, { Component } from 'react';
import { Button, Form, Container, Segment, List, Table } from "semantic-ui-react"
import EachCharacter from "./EachCharacter"
class Character extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            inputLoading: null,
            deleteLoading: null,
            text: "",
            characters: [{ _id: 123, name: 777, lv: 0, mana: 0, blood: 0, phy: 0, soul: 0, time: 0, magic: 0, updateCancelHide: "hide", editHide: null, }]
        }
        this.delete = this.delete.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    changeText(text) {
        if (this.state.text !== text) {
            this.setState({ text: text })
        }
    }
    changeToLoad() {
        if (this.state.text !== "") {
            this.setState({ inputLoading: "loading" })
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
                    if (this._isMounted) {
                        if (typeof result.ok != "undefined") {
                            this.setState(prevState => ({ characters: [result.ok, ...prevState.characters] }))
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
    delete(_id) {
        fetch('http://localhost:8080/delete/character', {
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
                            value={character} delete={this.delete} />
                    )}
                </Table.Body>

            </Table>

            <Form className={this.state.inputLoading}>
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

export default Character;