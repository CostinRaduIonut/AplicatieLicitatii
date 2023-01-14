import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJsClient from "react-stomp";
import { toast } from "react-toastify";

const SOCKET_URL = `http://localhost:8080/ws-chat/`;

const Product = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [pretNou, setPretNou] = useState("");

  const [message, setMessage] = useState();

  const navigate = useNavigate();

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
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    setInterval(() => {
      fetchData();
    }, 2000);
  }, []);

  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    console.log("New Message Received!!", msg);
    setMessage(msg.content);
  };

  let onSendMessage = () => {
    if(data.id_owner==localStorage.getItem("idUser"))
    {
      toast.warn("Ati licitat pentru propriul dumneavoastra produs")
    }
    if (pretNou > data.pret) {
      
      const requestOptions1 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: data.id,
          sender: localStorage.getItem("emailUser"),
          content: pretNou,
        }),
      };
      fetch(`http://localhost:8080/api/send/`, requestOptions1) 
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        });

        
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          pret: pretNou,
          castigator: localStorage.getItem("emailUser"),
        }),
      };
      fetch(`http://localhost:8080/products/${id}`, requestOptions);


      const requestOptions2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id_username:localStorage.getItem("idUser"),
          id_prod:data.id,
          pret:parseInt(pretNou)
        }),
      };
      fetch(`http://localhost:8080/products/putist`, requestOptions2) 
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        });

    }
    else
    {
        toast.error("Suma introdusa trebuie sa fie mai mare")
    }
  };

  return (
    <>
      <div className="App">
        <>
        <SockJsClient
        url={SOCKET_URL}
        topics={[`/topic/${id}`]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />

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
                              src={"/" + data.img}
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
                                <span className="price">
                                  {" "}
                                  {/* {{ message } ? <>{data.pret}</> : <>{message}</>} */}
                                  {data.pret}
                                  RON
                                </span>
                              </div>
                              <div className="wcf-right"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-main-column">
                {/* <form> */}
                <label>Liciteaza</label>
                <input
                  type={"number"}
                  value={pretNou}
                  onChange={(event) => setPretNou(event.target.value)}
                ></input>
                <button
                  style={{ padding: "2%", margin: "30px" }}
                  // onClick={updatePost}
                  onClick={onSendMessage}
                >
                  Liciteaza
                </button>
                {/* </form> */}
              </div>
              <div className="home-main-column">
                Castigator: {data.castigator}
                <br></br>
                Suma maxima licitata de cand ati intrat pe aceasta pagina este: 
                {message}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Product;
