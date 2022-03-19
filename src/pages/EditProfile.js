import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { API } from "../config/api";
import { useParams } from "react-router-dom";

export default function EditProfile() {
  const { myId } = useParams();
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
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
        form.address &&
        form.image
      ) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
        formData.set("name", form.name);
        formData.set("email", form.email);
        formData.set("password", form.password);
        formData.set("phone", form.phone);
        formData.set("address", form.address);
      }

      console.log(form);

      const response = await API.patch(`/profile/${myId}`, formData, config);
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        image: "",
      });
      setPreview(null);
      console.log(response.data);
      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1 fw-bold">
            Edit Profile Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#ececec" }}>
      <div className="container row mx-auto mb-5 fw-bold">
        <p className="" style={{ fontSize: "2.5rem" }}>
          Edit Profile
        </p>
      </div>

      <div className="container row mx-auto">
        {message && message}
        <Form onSubmit={handleSubmit} className="">
          <Form.Label className="fs-5 fw-bold ">Name</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              className="container px-3 py-2 mb-4"
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder={form.name}
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Email</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              className="container px-3 py-2 mb-4"
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Password</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              className="container px-3 py-2 mb-4"
              type="password"
              value={form.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Phone</Form.Label>
          <Form.Group className="mb-3">
            <Form.Control
              className="container px-3 py-2 mb-4"
              type="number"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Input Phone Number"
            />
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Image</Form.Label>
          <Form.Group
            className="mb-3 p-3"
            style={{
              height: "5rem",
              borderRadius: "0.5rem",
              backgroundColor: "rgb(245, 245, 245)",
            }}
          >
            {preview ? (
              <img
                className="shadow-lg"
                style={{ borderRadius: "0.5rem" }}
                src={preview}
              />
            ) : (
              <Form.Control
                className="shadow"
                type="file"
                name="image"
                onChange={handleChange}
                style={{ borderRadius: "0.5rem" }}
                placeholder="Input Image Here"
              />
            )}
          </Form.Group>
          <Form.Label className="fs-5 fw-bold ">Address</Form.Label>
          <Form.Group className="mb-5">
            <div className="form-floating">
              <textarea
                className="form-control px-3 py-2 mb-4"
                type="textarea"
                value={form.address}
                name="address"
                onChange={handleChange}
                placeholder="Input Address"
                id="floatingTextarea"
              ></textarea>
              <label htmlFor="floatingTextarea">Address</label>
            </div>
          </Form.Group>
          <button
            className="fw-bold btn-blue"
            style={{ fontSize: "0.9rem" }}
            variant=""
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
