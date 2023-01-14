import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";
import { toast } from "react-toastify";

const EditProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [newName, setNewName] = useState("");
  const [newPret, setNewPret] = useState("");
  const [newCategorie, setNewCategorie] = useState("");
  const [newDescriere, setNewDescriere] = useState("");
  const fetchData = () => {
    fetch(`http://localhost:8080/products/${id}`, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((usefulData) => {
        setData(usefulData);
      });
  };

  const convertToDataNormal = (timp) => {
    const date = new Date(timp);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchData();
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  async function remove() {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ expirat: true }),
      };
      fetch(`http://localhost:8080/products/expirat/${id}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  const updatePost = () => {
    if (newName === "") {
      // setNewName(data.name);
      toast.error("Lispseste numele");
      return;
    }
    if (newPret === "") {
      // setNewPret(data.pret);
      toast.error("Lispseste pretul");
      return;
    }
    if (newCategorie === "") {
      // setNewCategorie(data.categorie);
      toast.error("Lispseste categoria");
      return;
    }
    if (newDescriere === "") {
      // setNewDescriere(data.descriere);
      toast.error("Lispseste descrierea");
      return;
    }
    console.log(newName, newPret, newCategorie, newDescriere);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: newName,
        pret: parseInt(newPret),
        categorie: newCategorie,
        descriere: newDescriere,
      }),
    };
    fetch(`http://localhost:8080/products/edit/${id}`, requestOptions).then(
      () => window.location.reload()
    );
  };

  return (
    <>
      <div className="home-body">
        <div className="home-title">Produsul selectat</div>
        <div className="login-top">
          <div className="login-btn">
            <button
              onClick={() => {
                navigate("/MyProducts");
              }}
            >
              Inapoi
            </button>
          </div>
          <div className="login-btn">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
             Home
            </button>
          </div>
        </div>
        <div className="home-main">
          <div className="home-main-column">
            <div className="shell">
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <div className="wsk-cp-product">
                      <div className="wsk-cp-img">
                        <img src={"/" + data.img} alt="Product" />
                      </div>
                      <div className="wsk-cp-text">
                        <div className="category">
                          <span>{data.categorie}</span>
                        </div>
                        <div className="title-product">
                          <h3>{data.name}</h3>
                        </div>
                        <div className="description-prod">
                          <p>{data.descriere}</p>
                          <br></br>
                          <p>{convertToDataNormal(parseInt(data.data))}</p>
                        </div>
                        <div className="card-footer">
                          <div className="wcf-left">
                            <span className="price">{data.pret}RON</span>
                          </div>
                          <div className="wcf-right">
                            <button onClick={remove}> Sterge </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-main-column">
            <p style={{backgroundColor:"white", padding:"10px", width:"110%"}}>Suma licitata pana in prezent:<br></br> <span style={{color:"#803945"}}> {data.pret} </span>RON<br></br><br></br>Castigator:<br></br><span style={{color:"#803945"}}>{data.castigator}</span></p>
          </div>
          <form>
            <div className="row">
              <div className="col-25">
                <label htmlFor="name">Nume</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={data.name}
                  required={true}
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="pret">Pret</label>
              </div>
              <div className="col-75">
                <input
                  type="number"
                  id="pret"
                  name="pret"
                  placeholder={data.pret}
                  required={true}
                  value={newPret}
                  onChange={(event) => setNewPret(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="categorie">Categorie</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="categorie"
                  name="categorie"
                  placeholder={data.categorie}
                  required={true}
                  value={newCategorie}
                  onChange={(event) => setNewCategorie(event.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="descriere">Descriere</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  id="descriere"
                  name="descriere"
                  placeholder={data.descriere}
                  required={true}
                  value={newDescriere}
                  onChange={(event) => setNewDescriere(event.target.value)}
                ></input>
              </div>
            </div>

            <div className="row">
              <button
                type="button"
                style={{ margin: "20px 30%", padding: "10px" }}
                value={"submit"}
                onClick={updatePost}
              >
                Editeaza
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditProduct;
