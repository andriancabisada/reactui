import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditUserSubCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "/UserSubCategories", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: event.target.Id.value,
        CategoryNameId: event.target.CategoryNameId.value,
        CategoryName: event.target.CategoryName.value,
        SubCategoryName: event.target.SubCategoryName.value,
      }),
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
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header clooseButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit User Sub Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="Id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="Id"
                      required
                      placeholder="Id"
                      disabled
                      defaultValue={this.props.id}
                    />
                  </Form.Group>

                  <Form.Group controlId="CategoryNameId">
                    <Form.Label>CategoryNameId</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryNameId"
                      required
                      defaultValue={this.props.CategoryNameId}
                      placeholder="CategoryNameId"
                    />
                  </Form.Group>

                  <Form.Group controlId="CategoryName">
                    <Form.Label>CategoryName</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryName"
                      required
                      defaultValue={this.props.CategoryName}
                      placeholder="CategoryName"
                    />
                  </Form.Group>

                  <Form.Group controlId="SubCategoryName">
                    <Form.Label>SubCategoryName</Form.Label>
                    <Form.Control
                      type="text"
                      name="SubCategoryName"
                      required
                      defaultValue={this.props.SubCategoryName}
                      placeholder="SubCategoryName"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update User Sub Category
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
