import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUserCategoryModal } from "./AddUserCategoryModal";
import { EditUserCategoryModal } from "./EditUserCategoryModal";

export class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usercategory: [],
      addModalShow: false,
      editModalShow: false,
    };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/UserCategories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ usercategory: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteUserCategory(usercategoryid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "/UserCategories/" + usercategoryid, {
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
    const { usercategory, id, categoryName } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Category Name</th>

              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {usercategory.map((usrcat) => (
              <tr key={usrcat.id}>
                <td>{usrcat.categoryName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: usrcat.id,
                          CategoryName: usrcat.categoryName,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteUserCategory(usrcat.id)}
                    >
                      Delete
                    </Button>

                    <EditUserCategoryModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={usrcat.id}
                      CategoryName={usrcat.categoryName}
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
            Add User Category
          </Button>

          <AddUserCategoryModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
