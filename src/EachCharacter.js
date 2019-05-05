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
            lv: 0,
            blood:0,
            mana:0,
            phy:0,
            magic:0,
            soul:0
        }
    }
    update() {
        console.log("a")
        this.setState({ updateCancelHide: null, editHide: "hide" })
    }
    cancelUpdate() {
        this.setState({ updateCancelHide: "hide", editHide: null, lv: this.props.value.lv })
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
                    <Button onClick={() => { this.update(this.props.value._id) }} className={this.state.editHide}>Edit</Button>
                    <Button onClick={() => { this.update(this.props.value._id) }} className={this.state.updateCancelHide}>Update</Button>
                    <Button onClick={() => { this.cancelUpdate() }} className={this.state.updateCancelHide}>Cancel</Button>
                </Table.Cell>
                <Table.Cell><Button className={this.state.deleteLoading} onClick={() => { this.setState({ deleteLoading: "loading " }); this.props.delete(this.props.value._id) }}>Delete</Button></Table.Cell>
            </Table.Row>
        );
    }
}
export default EachCharacter;