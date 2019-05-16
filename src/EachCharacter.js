import React, { Component } from 'react';
import { Button, Table } from "semantic-ui-react"
import "./EachCharacter.css"
import classNames from 'classnames'
class EachCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteLoading: null,
            lv: this.props.value.lv,
            blood: this.props.value.blood,
            mana: this.props.value.mana,
            phy: this.props.value.phy,
            magic: this.props.value.magic,
            soul: this.props.value.soul
        }
    }
    cancelUpdate() {
        this.setState({ lv: this.props.value.lv, blood: this.props.value.blood, mana: this.props.value.mana, phy: this.props.value.phy, magic: this.props.value.magic, soul: this.props.value.soul })
    }
    render() {
        var updateButtonClasses = classNames({
            'hide': this.props.value.updateCancelHide === "hide",
            'loading': this.props.value.updateLoading === "loading"
        });
        let usept = this.state.blood + this.state.mana + this.state.phy + this.state.magic + this.state.soul
        let nonusept = this.state.lv * 3 - usept
        return (
            <Table.Row>
                <Table.Cell>{this.props.value.name}</Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { this.setState(prevState => ({ lv: prevState.lv + 1 })) }} /></div>
                    <div>{this.state.lv}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { this.setState(prevState => ({ lv: prevState.lv - 1 })) }} /></div>
                </Table.Cell>
                <Table.Cell>{nonusept}</Table.Cell>
                <Table.Cell>{usept}</Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ blood: prevState.blood + 1 })) } }} /></div>
                    <div>{this.state.blood}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.blood > 0) { this.setState(prevState => ({ blood: prevState.blood - 1 })) } }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ mana: prevState.mana + 1 })) } }} /></div>
                    <div>{this.state.mana}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.mana > 0) {this.setState(prevState => ({ mana: prevState.mana - 1 })) }} }/></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ phy: prevState.phy + 1 })) } }} /></div>
                    <div>{this.state.phy}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.phy > 0) {this.setState(prevState => ({ phy: prevState.phy - 1 })) }} }/></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ magic: prevState.magic + 1 })) } }} /></div>
                    <div>{this.state.magic}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.magic > 0) {this.setState(prevState => ({ magic: prevState.magic - 1 })) }} }/></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ soul: prevState.soul + 1 })) } }} /></div>
                    <div>{this.state.soul}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.soul > 0) {this.setState(prevState => ({ soul: prevState.soul - 1 })) }} }/></div>
                </Table.Cell>
                <Table.Cell>{new Date(this.props.value.time).toLocaleString()}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => { this.props.edit(this.props.value._id) }} className={this.props.value.editHide}>Edit</Button>
                    <Button onClick={() => { this.props.update({ _id: this.props.value._id, lv: this.state.lv, blood: this.state.blood, mana: this.state.mana, phy: this.state.phy, magic: this.state.magic, soul: this.state.soul }) }}
                        className={updateButtonClasses}>Update</Button>
                    <Button onClick={() => { this.props.cancelUpdate(this.props.value._id); this.cancelUpdate(); }} className={this.props.value.updateCancelHide}>Cancel</Button>
                </Table.Cell>
                <Table.Cell><Button className={this.state.deleteLoading} onClick={() => { this.setState({ deleteLoading: "loading " }); this.props.delete(this.props.value._id) }}>Delete</Button></Table.Cell>
            </Table.Row>
        );
    }
}
export default EachCharacter;