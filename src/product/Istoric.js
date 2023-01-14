import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Istoric = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const fetchData = () => {
    fetch(`http://localhost:8080/products/istoric`, {
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


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
      fetchData();
  }, []);

  return (
    <>
      <div className="App">
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
              <p>prentru acest produs, s-au licitat preturile:</p>

              {data
              .filter((data)=>data.id_prod==id)
              .map((data, idx) => {
                        return (
                            <>
                            <p key={idx}>{data.pret}</p>
                          
                         </>
                        );
                      })}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Istoric;
