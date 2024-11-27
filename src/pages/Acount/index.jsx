import "./index.css";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { FaUser , FaEnvelope , FaLock} from "react-icons/fa";
export default function Acount() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <section id="acount">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Meus Dados</h1>
          <form>
            <div>
              <FaUser />
              <label htmlFor="name">Nome</label>
              <input id="name" placeholder="Entre com o nome" required />
            </div>
            <div>
              <FaUser />
              <label htmlFor="lastname">Sobrenome</label>
              <input
                id="lastname"
                placeholder="Entre com o sobrenome"
                required
              />
            </div>
            <div>
              <FaEnvelope />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="exemplo@kipapa.com"
                required
              />
            </div>
            <div>
              <FaLock />
              <label htmlFor="passwod">Senha</label>
              <input
                id="passwod"
                type="passwod"
                placeholder="entre com a sua senha"
                required
              />
            </div>
            <div>
              <FaLock />
              <label htmlFor="passwod">Nova Senha</label>
              <input
                id="passwod"
                type="passwod"
                placeholder="Opcional"
                required
              />
            </div>
            <button>Atualizar</button>
          </form>
        </>
      )}
    </section>
  );
}
