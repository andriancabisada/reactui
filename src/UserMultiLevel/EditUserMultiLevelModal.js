import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class EditUserMultiLevelModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "/MultiLevelUsers", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ID: event.target.Id.value,
        Name: event.target.Name.value,
        Level: event.target.Level.value,
        Department: event.target.Department.value,
        Category: event.target.Category.value,
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
              Edit User
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

                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      required
                      defaultValue={this.props.Name}
                      placeholder="Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="Level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control
                      type="text"
                      name="Level"
                      required
                      defaultValue={this.props.Level}
                      placeholder="Level"
                    />
                  </Form.Group>

                  <Form.Group controlId="Department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="Department"
                      required
                      defaultValue={this.props.Department}
                      placeholder="Department"
                    />
                  </Form.Group>

                  <Form.Group controlId="Category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="Category"
                      required
                      defaultValue={this.props.Category}
                      placeholder="Category"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update User Multi Level
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
