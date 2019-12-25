import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import GuestBookForm from './GuestBookForm';

class GuestBookModal extends Component {

    state = {
        modal: false
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }

    render() {
        const isNew = this.props.isNew;

        let title = 'Edit Guest';
        let button = '';
        if (isNew) {
            title = 'Add Guest';

            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Add</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Edit</Button>;
        }

        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

                <ModalBody>
                    <GuestBookForm
                        addGuestToState={this.props.addGuestToState}
                        updateGuestIntoState={this.props.updateGuestIntoState}
                        toggle={this.toggle}
                        guest={this.props.guest} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}

export default GuestBookModal;