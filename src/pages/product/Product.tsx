import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Product.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Product = () => {
  const SOCKET_URL = 'http://localhost:8080/ws-chat/';
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const [pretNou, setPretNou] = useState("");

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

  const convertToDataNormal = (timp: any) => {
    const date = new Date(timp);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchData();
  }, []);

  // async function remove() {
  //   await fetch(`http://localhost:8080/products/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(() => {
  //     toast.success("Produs sters cu suces");
  //     // navigate("/");
  //   });
  // }

  const updatePost = () => {
    if (parseInt(pretNou) > data.pret) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          pret: pretNou,
          castigator: localStorage.getItem("emailUser"),
        }),
      };
      fetch(`http://localhost:8080/products/${id}`, requestOptions).then(
        (response) => {
          response.json();
        }
      );
    }
  };

  return (
    <>
      <div className="home-body">
        <div className="home-title">Produsul selectat</div>
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
        <div className="home-main">
          <div className="home-main-column">
            <div className="shell">
              <div className="container">
                <div className="row">
                  <div className="col-md-3">
                    <div className="wsk-cp-product">
                      <div className="wsk-cp-img">
                        <img
                          src={data.img}
                          alt="Product"
                          className="img-responsive"
                        />
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
                            {/* <button onClick={remove}> Sterge </button> */}
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
            <form>
              <label>Liciteaza</label>
              <input
                type={"number"}
                value={pretNou}
                onChange={(event) => setPretNou(event.target.value)}
              ></input>
              <button
                style={{ padding: "2%", margin: "30px" }}
                onClick={updatePost}
              >
                Liciteaza
              </button>
            </form>
          </div>
          <div className="home-main-column">
            Castigator: {data.castigator}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
