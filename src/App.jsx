import "./App.css";
import { Outlet , Link } from "react-router-dom";
import logo from './assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import { FaRegUser, FaRegBell, FaHamburger, FaShoppingCart } from 'react-icons/fa'
import React from "react";
import { BsGrid } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
export function App() {

  const [active , setAcrtive] = React.useState(0)
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
      name: "Entregadores",
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
      <header>
        <div>
          <img src={logo} loading="lazy" />
          <h1>Kipapa</h1>
        </div>
        <span>
          <FaRegUser />
          <FaRegBell />
          <LuSettings />
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
        <button>
          <p>Sair</p>
          <BiLogOut />
        </button>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  );
}
