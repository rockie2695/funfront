import React, { Component } from 'react';
import { Button, Table } from "semantic-ui-react"
import "./EachCharacter.css"
class EachCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raised: null,
            maxpt: this.props.value.lv * 3,
            deleteLoading: null,
            updateCancelHide: "hide",
            editHide: null,
            lv: this.props.value.lv,
            blood: this.props.value.blood,
            mana: this.props.value.mana,
            phy: this.props.value.phy,
            magic: this.props.value.magic,
            soul: this.props.value.soul
        }
    }
    edit() {
        this.setState({ updateCancelHide: null, editHide: "hide" })
    }
    update() {
        let query = {
            lv: this.state.lv,
            blood: this.state.blood,
            mana: this.state.mana,
            phy: this.state.phy,
            magic: this.state.magic,
            soul: this.state.soul
        }
        let whereCon = { "_id": this.props.value.id }
        fetch('http://localhost:8080/update/character', {
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
    cancelUpdate() {
        this.setState({ updateCancelHide: "hide", editHide: null, lv: this.props.value.lv, blood: this.props.value.blood, mana: this.props.value.mana, phy: this.props.value.phy, magic: this.props.value.magic, soul: this.props.value.soul })
    }
    render() {
        let usept = this.props.value.blood + this.props.value.mana + this.props.value.phy + this.props.value.magic + this.props.value.soul
        let nonusept = this.state.maxpt - usept
        return (
            <Table.Row>
                <Table.Cell>{this.props.value.name}</Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ lv: prevState.lv + 1 })) }} /></div>
                    <div>{this.state.lv}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ lv: prevState.lv - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>{nonusept}</Table.Cell>
                <Table.Cell>{usept}</Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ blood: prevState.blood + 1 })) }} /></div>
                    <div>{this.state.blood}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ blood: prevState.blood - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ mana: prevState.mana + 1 })) }} /></div>
                    <div>{this.state.mana}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ mana: prevState.mana - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ phy: prevState.phy + 1 })) }} /></div>
                    <div>{this.state.phy}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ phy: prevState.phy - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ magic: prevState.magic + 1 })) }} /></div>
                    <div>{this.state.magic}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ magic: prevState.magic - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ soul: prevState.soul + 1 })) }} /></div>
                    <div>{this.state.soul}</div>
                    <div><Button icon="down arrow" className={this.state.updateCancelHide} onClick={() => { this.setState(prevState => ({ soul: prevState.soul - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>{new Date(this.props.value.time).toLocaleString()}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => { this.edit(this.props.value._id) }} className={this.state.editHide}>Edit</Button>
                    <Button onClick={() => { this.update(this.props.value._id) }} className={this.state.updateCancelHide}>Update</Button>
                    <Button onClick={() => { this.cancelUpdate() }} className={this.state.updateCancelHide}>Cancel</Button>
                </Table.Cell>
                <Table.Cell><Button className={this.state.deleteLoading} onClick={() => { this.setState({ deleteLoading: "loading " }); this.props.delete(this.props.value._id) }}>Delete</Button></Table.Cell>
            </Table.Row>
        );
    }
}
export default EachCharacter;