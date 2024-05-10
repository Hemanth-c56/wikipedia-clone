import { createUserWithEmailAndPassword } from "firebase/auth";
import React,{useState} from "react";
import { Button,InputGroup,Form } from "react-bootstrap";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import wiki from "./wikifooter-removebg-preview.png"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const navigate = useNavigate()

  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  // const email = 'zaid1@gmail.com'
  // const password = 'yoyoyoyo'
  const settings = {
    color: "",
    size: "",
    fontFamily: "",
    isDark: false,
  };
  const signup = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        settings,
      }),

    };
    const res = await fetch(
      "https://wikipedia-clone-91be6-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json",
      options
    );
    navigate("/main")
    
  };

  return (
    <div className="sign-in-body">
      <img src={wiki} alt="" />
      <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          type="email"
          value={email}
          aria-describedby="basic-addon1"
          onChange={handleEmail}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
        <Form.Control
          placeholder="password"
          aria-label="password"
          type="password"
          value={password}
          aria-describedby="basic-addon1"
          onChange={handlePass}
        />
      </InputGroup>
      <Button type="submit" onClick={signup}>
        Sign up
      </Button>
      </div>
    </div>
  );
};

export default SignUp;
