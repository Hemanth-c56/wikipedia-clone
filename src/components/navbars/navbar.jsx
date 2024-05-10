import React, { useState } from "react";
import "./navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import microPhone from "./microphone.png";
import InputGroup from 'react-bootstrap/InputGroup';

function NavbarComponent(props) {
  const [input, setInput] = useState("");
  let recognition = null;

  const handleSpeechRecognition = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    stopSpeechRecognition();
    props.toHandleSearch(input);
    setInput("");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <div className="navbar-image-text">
              <div>
                <img
                  className="size-c"
                  src="https://en.wikipedia.org/static/images/icons/wikipedia.png"
                  alt="hi"
                />
              </div>
              <div className="wiki-c">
                <img src="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en.svg" />
                <img src="https://en.wikipedia.org/static/images/mobile/copyright/wikipedia-tagline-en.svg"></img>
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <InputGroup.Text id="basic-addon1" style={{cursor:"pointer"}} onClick={handleSpeechRecognition}>
                tap to speak
                <img style={{ width: "20px" ,marginLeft:'5px'}} src={microPhone} alt="" />
              </InputGroup.Text>
              <Form.Control
                type="input"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={input}
                onChange={handleChange}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
