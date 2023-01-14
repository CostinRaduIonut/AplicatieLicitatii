import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./auction.png";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  var EmailUser;
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      if (email.length < 3 || parola.length < 3) {
        toast.error("datele sunt gresite");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          username: email,
          password: parola,
        }),
      };
      fetch("http://localhost:8080/api/User/Login", requestOptions)
        .then((response) => response.text())
        .then((text) => {
          //preiau emailul folosind jwt_decode
          EmailUser = jwt_decode(text);
          // console.log(EmailUser.sub);
          localStorage.setItem("token", text);
          localStorage.setItem("emailUser", EmailUser.sub);
          localStorage.setItem("idUser", EmailUser.id);
          if (!localStorage.getItem("token")) {
            toast.error("ups");
          } else {
            toast.success("User logat cu succes");
            navigate("/");
          }
        });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="login-body">
      <div className="login-title">Login</div>
      <div className="login-top">
        <div className="login-btn">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Inapoi
          </button>
        </div>
        <div className="to-register-btn">
          <button
            onClick={() => {
              navigate("/Register");
            }}
          >
            Inregistrare
          </button>
        </div>
      </div>
      <div className="login-main" style={{ padding: "10px" }}>
        <form>
          <div className="row">
            <div className="col-25">
              <label htmlFor="email">Email</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Introdu email"
                required={true}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="parola">Parola</label>
            </div>
            <div className="col-75">
              <input
                type="password"
                id="parola"
                name="parola"
                placeholder="Introdu parola"
                required={true}
                value={parola}
                onChange={(event) => setParola(event.target.value)}
              ></input>
            </div>
          </div>

          <div className="row">
            <button
              type="button"
              style={{ margin: "20px 30%", padding: "10px" }}
              value={"submit"}
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
        <div className="login-main-column">
          <div className="imag" style={{ padding: "20px" }}>
            <img src={logo} style={{ width: "70%" }}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
