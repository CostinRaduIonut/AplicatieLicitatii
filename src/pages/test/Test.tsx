import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Test =()=>
{
    const navigate = useNavigate();

    const [nume, setNume] = useState<string>("");
    const [pret, setPret] = useState("");
    const [categoria, setCategoria] = useState("");
    const [descriere, setDescriere] = useState("");
    const [img, setImg] = useState("");
    //   const formData = new FormData();
  
    const handleSubmit = async (event: SyntheticEvent) => {
      try {
        event.preventDefault();
  
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nume,
            pret: pret,
            categorie: categoria,
            descriere: descriere,
            img: "/src/img/prod1.png",
            data: "",
          }),
        };
        fetch("http://localhost:8080/products", requestOptions).then((response) =>
          response.json()
        );
        console.log(nume, pret, categoria, descriere);
        setNume("");
        setPret("");
        setCategoria("");
        setDescriere("");
        setImg("");
        toast.success("Produs adaugat cu succes");
      } catch (err) {
        console.error(err);
        toast.error("Ceva a mers prost");
      }
    };
  
    return (
      <div className="login-body">
        <div className="login-title">Test la Adauga Imagini</div>
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
        </div>
        <div className="login-main" style={{ padding: "10px" }}>
          <form>
            <div className="row">
              <div className="col-25">
                <label htmlFor="nume">Nume produs</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="nume"
                  name="nume"
                  placeholder="Introdu nume"
                  required={true}
                  value={nume}
                  onChange={(event) => setNume(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="pret">Pret</label>
              </div>
              <div className="col-75">
                <input
                  style={{ width: "100%" }}
                  type="number"
                  id="pret"
                  name="pret"
                  placeholder="Introdu pret"
                  required={true}
                  value={pret}
                  onChange={(event) => setPret(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="categoria">Categorie</label>
              </div>
              <div className="col-75">
                <select
                  name="categotia"
                  id="categoria"
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                >
                  <option></option>
                  <option value="mar">Mar</option>
                  <option value="banana">Banana</option>
                  <option value="para">Para</option>
                  <option value="pruna">Pruna</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="descriere">Descriere</label>
              </div>
              <div className="col-75">
                <textarea
                  id="descriere"
                  name="descriere"
                  placeholder="Descrie produsul"
                  required={true}
                  value={descriere}
                  onChange={(event) => setDescriere(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="img">Imagine</label>
              </div>
              <div className="col-75">
                <input
                  type="file"
                  id="img"
                  name="img"
                  required={true}
                  value={img}
                  onChange={(event) => setImg(event.target.value)}
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
                Inregistrare produs
              </button>
            </div>
          </form>
          <div className="login-main-column">
            <div className="imag" style={{ padding: "20px" }}>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Test