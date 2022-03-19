import { React, useContext, useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { API } from "../config/api";
import { ModalContext } from "../context/ModalContext";

export default function ModalRegister() {
  const [, isOpen, toggle] = useContext(ModalContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      URL.createObjectURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (
        form.name &&
        form.email &&
        form.password &&
        form.phone &&
        form.image
      ) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
        formData.set("name", form.name);
        formData.set("email", form.email);
        formData.set("password", form.password);
        formData.set("phone", form.phone);
      }

      console.log(form);

      const response = await API.post("/register", formData, config);

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        image: "",
      });
      console.log(response.data);
      if (response.data.message === "register success") {
        {
          toggle("Login");
          toggle("Register");
        }
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 fw-bold">
          Please input form!
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Modal show={isOpen} onHide={() => toggle("Register")} centered>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit}
          className=" p-5"
          style={{
            color: "#0e67ec",
          }}
        >
          <Form.Label className="fs-2 fw-bold mb-4">Register</Form.Label>
          {message && message}
          <Form.Group className="mb-4" controlId="formBasicText">
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="fullName"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="password"
              value={form.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicNumber">
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
                height: "3rem",
              }}
              type="number"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Input Phone Number"
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formBasic">
            <Form.Control
              className="shadow"
              style={{
                borderWidth: 2,
                background: "#e2e2e2",
              }}
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Input Image"
            />
          </Form.Group>

          <Button
            className="container btn-blue fw-bold fs-5"
            variant=""
            type="submit"
            style={{
              borderRadius: "0.3rem",
            }}
          >
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
