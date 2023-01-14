import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { toast } from "react-toastify";

const MyProducts = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const convertToDataNormal = (timp) => {
    const date = new Date(timp);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    try {
      //  setInterval(() => {
      fetch("http://localhost:8080/products", {
        headers: {
          method: "GET",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((usefulData) => {
          // console.log(usefulData);
          setData(usefulData);
        });
      //  }, 1000);
    } catch (error) {
      toast.error("Eroare la afisarea datelor");
    }
  }, []);

  return (
    <>
      <div className="home-body">
        <div className="home-title">Piata mica</div>
        <div className="home-top-actionbutton">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
        <div className="home-top">
          {/* incepe sectiunea pentru carduri */}
          {data
            .filter((data) => data.id_owner == localStorage.getItem("idUser"))
            .sort((data, data1) => data.id - data1.id)
            .map((data) => {
              return (
                <div className="home-main-column" key={data.id}>
                  <div className="shell">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="wsk-cp-product">
                            <div className="wsk-cp-img">
                              <img src={data.img} alt="" />{" "}
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
                                <p>
                                  {convertToDataNormal(parseInt(data.data))}
                                </p>
                              </div>
                              <div className="card-footer">
                                <div className="wcf-left">
                                  <span className="price">{data.pret}RON</span>
                                </div>
                                <div className="wcf-right">
                                  {data.expirat == true ? (
                                    <p>Expirat</p>
                                  ) : (
                                    <Link
                                      style={{ padding: "2%" }}
                                      to={`/EditProduct/${data.id}`}
                                    >
                                      Editeaza
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {/* final sectiune carduri */}
        </div>
      </div>
    </>
  );
};

export default MyProducts;
