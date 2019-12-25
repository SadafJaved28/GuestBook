import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import GuestBookModal from './form/GuestBookModal';

import { GUEST_API_URL } from '../constants';

class DataTable extends Component {

  deleteItem = id => {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion) {
      fetch(`${GUEST_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const items = this.props.items;
    return <Table striped>
      <thead className="thead-dark">
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Date</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="6" align="center"><b>No Guest Book yet</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.Id}>
              <th scope="row">
                {item.id}
              </th>
              <td>
                {item.name}
              </td>
              <td>
                {item.email}
              </td>
              <td>
                {item.message}
              </td>
              <td>
                {item.createdDate}
              </td>
              <td align="center">
                <div>
                  <GuestBookModal
                    isNew={false}
                    guest={item}
                    updateGuestIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}

export default DataTable;
