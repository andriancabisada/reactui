import React, { Component } from "react";
import { Table } from "react-bootstrap";

import { Button, ButtonToolbar } from "react-bootstrap";
import { AddUserSubCategoryModal } from "./AddUserSubCategoryModal";
import { EditUserSubCategoryModal } from "./EditUserSubCategoryModal";

export class UserSubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersubcat: [],
      addModalShow: false,
      editModalShow: false,
    };
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + "/UserSubCategories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ usersubcat: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteUserSubCategory(usersubcatid) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + "/UserSubCategories/" + usersubcatid, {
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
    const { usersubcat, id, categoryNameId, categoryName, subCategoryName } =
      this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Category Name Id</th>
              <th>Category Name</th>
              <th>Sub Category Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {usersubcat.map((usersubcat) => (
              <tr key={usersubcat.id}>
                <td>{usersubcat.categoryNameId}</td>
                <td>{usersubcat.categoryName}</td>
                <td>{usersubcat.subCategoryName}</td>

                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          id: usersubcat.id,
                          CategoryNameId: usersubcat.categoryNameId,
                          CategoryName: usersubcat.categoryName,
                          SubCategoryName: usersubcat.subCategoryName,
                        })
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={() => this.deleteUserSubCategory(usersubcat.id)}
                    >
                      Delete
                    </Button>

                    <EditUserSubCategoryModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      id={usersubcat.id}
                      CategoryNameId={usersubcat.categoryNameId}
                      CategoryName={usersubcat.categoryName}
                      SubCategoryName={usersubcat.subCategoryName}
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
            Add User Sub Category
          </Button>

          <AddUserSubCategoryModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
