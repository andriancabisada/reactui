import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUserModal } from "./AddUserModal";
import { EditUserModal } from "./EditUserModal";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: [], addModalShow: false, editModalShow: false };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteUser(userid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "/users/" + userid, {
        method: "DELETE",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }
  render() {
    const { user, id, firstName, lastName, email, age } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Firstt Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {user.map((usr) => (
              <tr key={usr.id}>
                <td>{usr.firstName}</td>
                <td>{usr.lastName}</td>
                <td>{usr.age}</td>
                <td>{usr.email}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: usr.id,
                          firstName: usr.firstName,
                          lastName: usr.lastName,
                          email: usr.email,
                          age: usr.age,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteUser(usr.id)}
                    >
                      Delete
                    </Button>

                    <EditUserModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={usr.id}
                      firstName={usr.firstName}
                      lastName={usr.lastName}
                      age={usr.age}
                      email={usr.email}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button
            variant="primary"
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add User
          </Button>

          <AddUserModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>
      </div>
    );
  }
}
