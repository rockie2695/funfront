import React, { Component } from 'react';
import { Button, Form, Container, Segment, List } from "semantic-ui-react"

class Character extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            loading: null,
            text: "",
            characters: [{ _id: 123, name: 777, lv: 0, mana: 0, blood: 0, phy: 0, soul: 0, time: 0, magic: 0 }]
        }
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
            this.setState({ loading: "loading" })
            console.log(this.state.text)
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
                        this.setState(prevState => ({ characters: [...prevState.characters, result.ok] }))
                    }
                    console.log(this.state.characters)
                }, (error) => {
                    console.log(error)
                    alert(error)
                }).then(() => {
                    if (this._isMounted) {
                        this.setState({ loading: null })
                    }

                });
        }
    }
    render() {
        return (<div>
            <div>
                {this.state.characters.map((character) =>
                    <ListItem key={character._id}
                        value={character} />

                )}
            </div>
            <Form className={this.state.loading}>
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

const numbers = [1, 2, 3, 4, 5];

function ListItem(props) {
    return (<Segment raised>
        <List horizontal>
            <List.Item>
                {props.value.name}
            </List.Item>
            <List.Item>
                {props.value.lv}
            </List.Item>
            <List.Item>
                {props.value.blood}
            </List.Item>
            <List.Item>
                {props.value.mana}
            </List.Item>
            <List.Item>
                {props.value.phy}
            </List.Item>
            <List.Item>
                {props.value.magic}
            </List.Item>
            <List.Item>
                {props.value.soul}
            </List.Item>
            <List.Item>
                {new Date(props.value.time).toLocaleString()}
            </List.Item>
        </List>
    </Segment>);
}

export default Character;