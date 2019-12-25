import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
import GuestBookModal from './form/GuestBookModal';

import { GUEST_API_URL } from '../constants';

class Home extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    fetch(GUEST_API_URL)
      .then(res => res.json())
      .then(res => {
        res.sort((a, b) => a.Id - b.Id).reverse();
        this.setState({ items: res });console.log(res);})
      .catch(err => console.log(err));      
  }

  addGuestToState = guest => {
    this.setState(previous => ({
      items: [guest,...previous.items]
    }));
  }

  updateState = (Id) => {
    this.getItems();
  }

  deleteItemFromState = id => {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }

  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>Guest Book</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={this.state.items}
            updateState={this.updateState}
            deleteItemFromState={this.deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <GuestBookModal isNew={true} addGuestToState={this.addGuestToState} />
        </Col>
      </Row>
    </Container>;
  }
}

export default Home;
