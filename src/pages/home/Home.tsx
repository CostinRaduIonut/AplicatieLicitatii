import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Searchbar } from "../../components/searchbar/Searchbar";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

export const Home = () => {
  const [data, setData] = useState<any[]>([]);

  const convertToDataNormal = (timp: any) => {
    const date = new Date(timp);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    // setExpirat(timp);

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

  function setExpirat(data: any, id: number) {
    try {
      const dataDeverificat = Date.now();
      const rez = parseInt(data) + 172800000;
      //de modificat din false in true ca sa mearga
      if (rez > dataDeverificat) {
      } else {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ expirat: true }),
        };
        fetch(`http://localhost:8080/products/expirat/${id}`, requestOptions);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const LogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailUser");
    localStorage.removeItem("idUser");
    window.location.reload();
  };

  const navigate = useNavigate();
  const pressLogin = () => {
    navigate("/Login");
  };
  const pressRegister = () => {
    navigate("/Register");
  };

  const [price, setPrice] = useState<number | undefined>(undefined);

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const categories: string[] = ["Mar", "Banana", "Para", "Pruna"];

  const [checked, setChecked] = useState<boolean[]>(
    new Array(categories.length).fill(false)
  );

  const handleChange = (idx: number) => {
    const newChecked = checked.map((checkedBool, checkedIndex) =>
      checkedIndex === idx ? !checkedBool : checkedBool
    );

    setChecked(newChecked);
  };
  const [searched, setSearched] = useState<string>("");

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      query: { value: string };
    };
    setSearched(target["query"].value);
  };

  const [afis, setAfis] = useState(false);
  const [textAfis, setTextAfis] = useState<string>("User");
  const afiseaza = () => {
    setAfis(!afis);
    if (afis == false) setTextAfis("Hide");
    else setTextAfis("User");
  };

  return (
    <>
      <div className="home-body">
        <div className="home-title">Piata mica</div>
        <div className="home-top">
          <div className="home-top-searchbar">
            <Searchbar handleSubmit={handleSearchSubmit} />
          </div>{" "}
          {localStorage.getItem("token") ? (
            <>
              <div className="home-top-actionbutton">
                <button onClick={() => navigate("/Upload")}>Upload</button>
              </div>
              <div className="home-top-actionbutton">
                <button onClick={() => navigate("/MyProducts")}>My prod</button>
              </div>
              <div className="home-top-actionbutton">
                <button onClick={LogOut}>Logout</button>
              </div>
            </>
          ) : (
            afis && (
              <>
                <div className="home-top-actionbutton">
                  <button onClick={pressLogin}>Login</button>
                </div>
                <div className="home-top-actionbutton">
                  <button onClick={pressRegister}>Inregistrare</button>
                </div>
              </>
            )
          )}
          {
          !localStorage.getItem("token") ?
           (
            <div className="home-top-actionbutton">
              <button onClick={afiseaza}>{textAfis}</button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="home-main">
          <div className="home-main-column">
            <div className="home-main-column-title">
              <h1>Filtrare</h1>
            </div>
            <form>
              <div className="filter-section">
                <div className="filter-section-price">
                  <span>Pret:</span>
                  <input
                    value={price || 0}
                    onChange={handlePriceChange}
                    min="0"
                    name="pret"
                    type="number"
                  />
                </div>
                <div className="filter-section-note">
                  Pretul ales:{" "}
                  {price !== undefined && price > 0 && (
                    <>
                      <span style={{ color: "darkgreen", fontWeight: "500" }}>
                        {price}
                      </span>{" "}
                      RON
                    </>
                  )}
                </div>
              </div>
              <div className="filter-section">
                <label htmlFor="categorie">Categorii:</label>
                <div className="filter-section-categories">
                  {categories.map((category, index) => {
                    return (
                      <div key={index}>
                        <input
                          key={index}
                          type="checkbox"
                          name="categorie"
                          value={category}
                          checked={checked[index]}
                          onChange={() => handleChange(index)}
                        />
                        {category}
                      </div>
                    );
                  })}
                </div>
                <div className="filter-section-note">
                  Categorii alese:{" "}
                  <span style={{ fontWeight: "500" }}>
                    {categories.filter((_cat, idx) => checked[idx]).join(", ")}
                  </span>
                </div>
              </div>
            </form>
          </div>
          {/* incepe sectiunea pentru carduri */}
          {localStorage.getItem("token") ? (
            <>
              {data
                .filter((data) => data.expirat == false)
                .filter((data) => data.pret >= (price || 0))
                .filter((data) =>
                  data.categorie.includes(
                    categories
                      .filter((_cat, idx) => checked[idx])
                      .join("")
                      .toLowerCase()
                  )
                )
                .filter((data) => data.name.includes(searched))
                .sort((data, data1) => data.id - data1.id)
                .map((data) => {
                  {
                    setExpirat(data.data, data.id);
                  }

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
                                      <span className="price">
                                        {data.pret}RON
                                      </span>
                                    </div>
                                    <div className="wcf-right">
                                      <Link
                                        style={{ padding: "2%" }}
                                        to={`/Product/${data.id}`}
                                      >
                                        Liciteaza
                                      </Link>
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
            </>
          ) : (
            <>
              <div className="home" style={{ fontSize: "40px" }}>
                <h1>PLEASE LOGIN</h1>
                {/* {data.map((data) => {
                    return (
                       <p>{data.categorie}</p>
                    );
                  })} */}
              </div>
            </>
          )}
          {/* final sectiune carduri */}
        </div>
      </div>

      <div className="footer">Costin Radu Ionut</div>
    </>
  );
};
