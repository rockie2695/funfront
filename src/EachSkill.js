import React, { Component } from 'react';
import { Button, Table } from "semantic-ui-react"
import "./EachCharacter.css"
import classNames from 'classnames'
class EachSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteLoading: null,
            lv: this.props.value.lv,
            useMana: this.props.value.useMana,
            time: this.props.value.time,
            type: this.props.value.type,
            value: this.props.value.value
        }
    }
    cancelUpdate() {
        this.setState({
            lv: this.props.value.lv,
            useMana: this.props.value.useMana,
            type: this.props.value.type,
            value: this.props.value.value
        })
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
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ blood: prevState.blood + 1 })) } }} /></div>
                    <div>{this.state.useMana}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.blood > 0) { this.setState(prevState => ({ blood: prevState.blood - 1 })) } }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ phy: prevState.phy + 1 })) } }} /></div>
                    <div>{this.state.type}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.phy > 0) { this.setState(prevState => ({ phy: prevState.phy - 1 })) } }} /></div>
                </Table.Cell>
                <Table.Cell>
                    <div><Button icon="up arrow" className={this.props.value.updateCancelHide} onClick={() => { if (nonusept > 0) { this.setState(prevState => ({ magic: prevState.magic + 1 })) } }} /></div>
                    <div>{this.state.value}</div>
                    <div><Button icon="down arrow" className={this.props.value.updateCancelHide} onClick={() => { if (this.state.magic > 0) { this.setState(prevState => ({ magic: prevState.magic - 1 })) } }} /></div>
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
export default EachSkill;