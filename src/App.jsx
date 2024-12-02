/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Outlet , Link } from "react-router-dom";
import logo from './assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import { FaRegUser, FaHamburger, FaShoppingCart, FaCoins} from 'react-icons/fa'
import React, { useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaBowlFood } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAdminData } from "./services/getAdminData";

export function App() {
  const nav = useNavigate()
  const [active, setAcrtive] = React.useState(0)
  const [show , setShow] = useState(false)
  useEffect(() => {
    
    async function isAdmin() {
      const response = await getAdminData()
      if (!response) {
        nav("/login")
        return
      } else {
        setShow(true)
      }
      
    }
    isAdmin()
  },[])
  const adminLinks = [
    {
      icon: <BsGrid />,
      name: "Painel",
      path: "/",
    },
    {
      icon: <FaHamburger />,
      name: "Produtos",
      path: "/product",
    },
    {
      icon: <FaBowlFood />,
      name: "Categorias",
      path: "/category",
    },
    {
      icon: <FaRegUser />,
      name: "Funcionários",
      path: "/users",
    },
    {
      icon: <FaShoppingCart />,
      name: "Pedidos",
      path: "/orders",
    },
    {
      icon: <FaRegUser />,
      name: "Clientes",
      path: "/clients",
    },
  ];
  return (
    <main id="app">
      <ToastContainer></ToastContainer>
      {show && (
        <>
          <header>
            <div>
              <img src={logo} loading="lazy" />
              <h1>Kipapa</h1>
            </div>
            <span>
              <FaCoins
                onClick={() => {
                  nav("/pay");
                }}
              />
              <FaRegUser
                onClick={() => {
                  nav("/acount");
                }}
              />
            </span>
          </header>
          <nav>
            <ol>
              {adminLinks.map((item, index) => (
                <Link
                  to={item.path}
                  onClick={() => {
                    setAcrtive(index);
                  }}
                  key={index}
                  style={{
                    backgroundColor: active == index ? "var(--pink)" : "",
                    color: active == index ? "var(--white)" : "",
                  }}
                >
                  <p>{item.name}</p>
                  {item.icon}
                </Link>
              ))}
            </ol>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                nav("/login");
              }}
            >
              <p>Sair</p>
              <BiLogOut />
            </button>
          </nav>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </main>
  );
}
