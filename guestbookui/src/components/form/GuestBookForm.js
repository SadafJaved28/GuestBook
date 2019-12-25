import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { GUEST_API_URL } from '../../constants';

class GuestBookForm extends React.Component {

    state = {
        id: 0,
        name: '',        
        email: '',
        message: '',
        createdDate: ''
    }

    componentDidMount() {
        if (this.props.guest) {
            const { id, name, email, message, createdDate } = this.props.guest
            this.setState({ id, name, email, message, createdDate});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();
        fetch(`${GUEST_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            })
        })
            .then(res => res.json())
            .then(guest => {
                this.props.addGuestToState(guest);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        e.preventDefault();
        fetch(`${GUEST_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:this.state.id,
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateGuestIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }

    render() {
        return <Form onSubmit={this.props.guest ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="text" name="name" onChange={this.onChange} value={this.state.name === '' ? '' : this.state.name} />
            </FormGroup>            
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" name="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
            </FormGroup>
            <FormGroup>
                <Label for="message">Message:</Label>
                <Input type="text" name="message" onChange={this.onChange} value={this.state.message === null ? '' : this.state.message} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}

export default GuestBookForm;