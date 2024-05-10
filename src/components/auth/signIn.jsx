import { signInWithEmailAndPassword } from "firebase/auth";
import React,{useState} from "react";
import { Button,InputGroup,Form } from "react-bootstrap";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signin.css"
import wiki from "./wikifooter-removebg-preview.png"

const SignIn = () => {
  // const email = 'zaid1@gmail.com'
  // const password = 'yoyoyoyo'
//   const handleEmail(e)=>{
//     setEmail(e.target.value);
//     console.log(e.target.value);
  const navigate = useNavigate()
//   }
    const handleEmail=((e)=>{
        setEmail(e.target.value)
    })

    const handlePass=((e)=>{
        setPassword(e.target.value)
    })

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
      navigate("/main")
  };
  return (
    <div className="sign-in-body">
        <img src={wiki} alt="" />
      <div>
      <InputGroup className="mb-3" >
        <InputGroup.Text id="basic-addon1" required>Email</InputGroup.Text>
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          type='email'
          value={email}
          aria-describedby="basic-addon1"
          onChange={handleEmail}
          
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" required>Password</InputGroup.Text>
        <Form.Control
          placeholder="password"
          aria-label="password"
          type='password'
          value={password}
          aria-describedby="basic-addon1"
          onChange={handlePass}
        />
      </InputGroup>
      <Button type="submit" onClick={signIn}>
        Login
      </Button>
      <Link to="/signup">new user?</Link>
      </div>
    </div>
  );
};

export default SignIn;
