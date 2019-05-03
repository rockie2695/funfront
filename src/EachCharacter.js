import React, { Component } from 'react';
import { Button, Form, Container, Segment, List, Table } from "semantic-ui-react"
class EachCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            raised: null,
            maxpt: this.props.value.lv * 3,
            deleteLoading: null
        }
    }

    render() {
        let usept = this.props.value.blood + this.props.value.mana + this.props.value.phy + this.props.value.magic + this.props.value.soul
        let nonusept = this.state.maxpt - usept
        return (
            <Table.Row>
                <Table.Cell>{this.props.value.name}</Table.Cell>
                <Table.Cell>{this.props.value.lv}</Table.Cell>
                <Table.Cell>{nonusept}</Table.Cell>
                <Table.Cell>{usept}</Table.Cell>
                <Table.Cell>{this.props.value.blood}</Table.Cell>
                <Table.Cell>{this.props.value.mana}</Table.Cell>
                <Table.Cell>{this.props.value.phy}</Table.Cell>
                <Table.Cell>{this.props.value.magic}</Table.Cell>
                <Table.Cell>{this.props.value.soul}</Table.Cell>
                <Table.Cell>{new Date(this.props.value.time).toLocaleString()}</Table.Cell>
                <Table.Cell><Button onClick={() => { this.setState({ deleteLoading: "loading" }); this.props.update(this.props.value._id) }}>Edit</Button></Table.Cell>
                <Table.Cell><Button className={this.state.deleteLoading} onClick={() => { this.setState({ deleteLoading: "loading " });this.props.delete(this.props.value._id)}}>Delete</Button></Table.Cell>
            </Table.Row>
        );
    }
}
export default EachCharacter;