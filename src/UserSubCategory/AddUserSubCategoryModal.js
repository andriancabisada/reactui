import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class AddUserSubCategoryModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "/UserSubCategories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //Id: 0,
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
              Add User Sub Category Name
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="CategoryNameId">
                    <Form.Label>CategoryNameId</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryNameId"
                      required
                      placeholder="CategoryNameId"
                    />
                  </Form.Group>

                  <Form.Group controlId="CategoryName">
                    <Form.Label>CategoryName</Form.Label>
                    <Form.Control
                      type="text"
                      name="CategoryName"
                      required
                      placeholder="CategoryName"
                    />
                  </Form.Group>

                  <Form.Group controlId="SubCategoryName">
                    <Form.Label>SubCategoryName</Form.Label>
                    <Form.Control
                      type="text"
                      name="SubCategoryName"
                      required
                      placeholder="SubCategoryName"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add User Sub Category
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
