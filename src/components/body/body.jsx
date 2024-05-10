import React, { useState, useEffect } from "react";
import NavbarComponent from "../navbars/navbar";
import "./body.css";
import Dropdown from "react-bootstrap/Dropdown";
import openSpeaker from "./speaker.png";
import muteSpeaker from "./silent.png";
import { InputGroup, Form } from "react-bootstrap";
import YourComponent from "./getimg";
import moon from "./moon.png";
import sun from "./sun.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

function Body() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ismute, setIsmute] = useState(false);
  const [searchInput, setSearchInput] = useState("India");
  const [speech, setSpeech] = useState(null);
  var [color, setColor] = useState("black");
  var [fontFam, setFontFam] = useState("");
  var [fontSize, setFontSize] = useState("16");
  var [fontSizeClass, setFontSizeClass] = useState("fs-16");
  var [mode, setMode] = useState(false);
  var [settings, setSettings] = useState({
    color: "",
    fontFamily: "",
    isDark: false,
    size: "",
  });
  var url;
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  //https://api.unsplash.com/search/photos?page=2&query=berlin&client_id=xp-ehbmHSjRw338-Tr4bisv8lXQO0shEQ3STMWFIHqk

  function handleFontSize(event) {
    setFontSize(event.target.value);
    setFontSizeClass(`fs-${event.target.value}`);
  }
  function handlecolor(event) {
    setColor(event.target.innerHTML);
    console.log(event.target.innerHTML);
  }

  function handleMode() {
    setMode(!mode);
    if (mode) {
      document.body.style.backgroundColor = "white";
      setColor("black");
    } else {
      document.body.style.backgroundColor = "#343434";
      setColor("white");
    }
  }

  function handlePrint(){
    window.print();
  }

  function handleFontFam(event) {
    setFontFam(event.target.innerHTML);
  }

  function handleSpeaker() {
    if (!ismute) {
      readText(contents.join(" "));
    } else {
      stopSpeech();
    }

    setIsmute(!ismute);
  }

  function handleSearch(input) {
    setSearchInput(input.charAt(0).toUpperCase() + input.slice(1));
  }

  useEffect(() => {
    url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${searchInput}`;
  }, [searchInput]);

  const extractAPIContents = (json) => {
    const { pages } = json.query;
    return Object.keys(pages).map((id) => pages[id].extract);
  };

  const getContents = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      const contents = extractAPIContents(json);
      setContents(contents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContents();
  }, [searchInput]);

  const readText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      setIsmute(false);
    };

    speechSynthesis.speak(utterance);
    setSpeech(utterance);
  };

  const stopSpeech = () => {
    const speechSynthesis = window.speechSynthesis;
    if (speech) {
      speechSynthesis.cancel();
      setSpeech(null);
    }
  };

  if (loading) return "Loading...";
  if (error) return "An error occurred";

  return (
    <div>
      <NavbarComponent toHandleSearch={handleSearch} />
      <div className="view-body">
        <div className="actual-body">
          <div className="first-container">
            <h2 className={`${color}`} style={{ margin: "0" }}>
              {searchInput}
            </h2>
            <div>
              <div>
                {mode? <span onClick={handleMode} style={mode?{color:"white",cursor:"pointer"}:{cursor:"pointer"}}>to light </span>:<span onClick={handleMode} style={{cursor:"pointer"}}>to dark </span>}
                <img
                  style={{ width: "20px", cursor: "pointer" }}
                  onClick={handleMode}
                  src={mode ? sun : moon}
                  alt=""
                />
              </div>
            </div>
          </div>
          <hr style={{ margin: "0" }} />
          <div className="second-container">
            <div className="second-mini">
                  <button className="prnt-btn" onClick={handlePrint}>Print</button>
            </div>
            <div className="second-mini">
              <div>
                {ismute ? <span onClick={handleSpeaker} style={mode?{cursor:"pointer",color:"white"}:{cursor:"pointer"}}>to stop </span> : <span onClick={handleSpeaker} style={mode?{cursor:"pointer",color:"white"}:{cursor:"pointer"}}>to speak </span>}
                <img
                  style={mode?{width: "30px", cursor: "pointer",filter: "brightness(0) invert(1)"}:{width: "30px", cursor: "pointer"}}
                  onClick={handleSpeaker}
                  src={ismute ? muteSpeaker : openSpeaker}
                  alt=""
                />
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Font-Color
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "black",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      black
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      red
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "blue",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      blue
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "green",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      green
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "yellow",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      yellow
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "orange",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      orange
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "pink",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      pink
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "violet",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      violet
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "cyan",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      cyan
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handlecolor}>
                      <span
                        style={{
                          display: "inline-block",
                          height: "15px",
                          width: "15px",
                          borderRadius: "50%",
                          backgroundColor: "gold",
                          marginRight: "5px",
                        }}
                      ></span>{" "}
                      gold
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="second-mini">
              <div>
                <InputGroup className="">
                  {/* <InputGroup.Text id="basic-addon1">Font-size</InputGroup.Text> */}
                  <Form.Label style={{ marginTop: "5px", marginRight: "3px" }}>
                    <span style={mode?{color:"white"}:null}>Font-Size :</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="Font-Size"
                    type="number"
                    min="10"
                    step="2"
                    max="64"
                    value={fontSize}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleFontSize}
                  />
                </InputGroup>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Font-Style
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={handleFontFam}
                      style={{ fontFamily: "cursive" }}
                    >
                      cursive
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={handleFontFam}
                      style={{ fontFamily: "monospace" }}
                    >
                      monospace
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={handleFontFam}
                      style={{ fontFamily: "initial" }}
                    >
                      initial
                    </Dropdown.Item>
                    {/* <Dropdown.Item href="#/action-3" style={{fontFamily:"revert"}}>Revert</Dropdown.Item> */}
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={handleFontFam}
                      style={{ fontFamily: "sans-serif" }}
                    >
                      san-Serif
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#/action-3"
                      onClick={handleFontFam}
                      style={{ fontFamily: "fantasy" }}
                    >
                      fantasy
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
          <hr style={{ margin: "0" }} />
          <div className="matter-container">
            <div className={`matter-left ${color} ${fontFam} ${fontSizeClass}`}>
              {contents.map((content, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ))}
            </div>
            <div className="matter-right">
              {/* <div className="img1-div"><img src="" alt="1" /></div>
              <div className="img2-div"><img src="" alt="2" /></div> */}
              <YourComponent forinput={searchInput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
