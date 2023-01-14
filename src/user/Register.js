import React, { SyntheticEvent, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./auction.png"; //
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [nume, setNume] = useState("");
  const [parola, setParola] = useState("");
  const [confParola, setConfParola] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(nume, parola, confParola);
      if (nume.length < 3 || parola.length < 4 || confParola !== parola) {
        toast.error("Datele introduse sunt gresite sau incomplete");
        return;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: nume,
          password: parola,
        }),
      };
      fetch("http://localhost:8080/api/User/Register", requestOptions);
      setNume("");
      setParola("");
      setConfParola("");
      toast.success("Te-am reperat");
      navigate("/Login");
    } catch (err) {
      console.error(err);
      toast.error("Ceva a mers prost");
    }
  };

  return (
    <div className="login-body">
      <div className="login-title">Register</div>
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
              navigate("/Login");
            }}
          >
            Logare
          </button>
        </div>
      </div>
      <div className="login-main" style={{ padding: "10px" }}>
        <form>
          <div className="row">
            <div className="col-25">
              <label htmlFor="nume">Email</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="nume"
                name="nume"
                placeholder="Introdu emailul"
                required={true}
                value={nume}
                onChange={(event) => setNume(event.target.value)}
              ></input>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-25">
              <label htmlFor="prenume">Prenume</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="prenume"
                name="prenume"
                placeholder="Introdu prenume"
                required={true}
                value={prenume}
                onChange={(event) => setPrenume(event.target.value)}
              ></input>
            </div>
          </div> 
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
          </div>*/}
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
            <div className="col-25">
              <label htmlFor="confParola">Parola</label>
            </div>
            <div className="col-75">
              <input
                type="password"
                id="confParola"
                name="confParola"
                placeholder="Introdu parola din nou"
                required={true}
                value={confParola}
                onChange={(event) => setConfParola(event.target.value)}
              ></input>
            </div>
          </div>
          <div className="row">
            <button
              type="button"
              style={{ margin: "20px 30%", padding: "10px" }}
              value="submit"
              onClick={handleSubmit}
            >
              Inregistrare
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

export default Register;
