import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUserMultiLevelModal } from "./AddUserMultiLevelModal";
import { EditUserMultiLevelModal } from "./EditUserMultiLevelModal";

export class UserMultiLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usermultilevel: [],
      addModalShow: false,
      editModalShow: false,
    };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/MultiLevelUsers")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ usermultilevel: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteUserMultiLevel(usermultilvlid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "/MultiLevelUsers/" + usermultilvlid, {
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
    const { usermultilevel, Id, Name, Level, Department, Category } =
      this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Department</th>
              <th>Category</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {usermultilevel.map((usrmultilvl) => (
              <tr key={usrmultilvl.id}>
                <td>{usrmultilvl.name}</td>
                <td>{usrmultilvl.level}</td>
                <td>{usrmultilvl.department}</td>
                <td>{usrmultilvl.category}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          Id: usrmultilvl.id,
                          Name: usrmultilvl.name,
                          Level: usrmultilvl.level,
                          Department: usrmultilvl.department,
                          Category: usrmultilvl.category,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteUserMultiLevel(usrmultilvl.id)}
                    >
                      Delete
                    </Button>

                    <EditUserMultiLevelModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      Id={usrmultilvl.id}
                      Name={usrmultilvl.name}
                      Level={usrmultilvl.level}
                      Department={usrmultilvl.department}
                      Category={usrmultilvl.category}
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
            Add User Multi Level
          </Button>

          <AddUserMultiLevelModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
