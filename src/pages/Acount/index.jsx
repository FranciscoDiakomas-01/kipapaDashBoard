/* eslint-disable no-unused-vars */
import "./index.css";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaLocationArrow } from "react-icons/fa";
import { getAdminData, updateAdmin } from "../../services/getAdminData";
import { toast } from "react-toastify";
export default function Acount() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [qoute, setQuoute] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPasword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reload , setReload] = useState(false)
  useEffect(() => {
     async function get() {
       const response = await getAdminData();
       setName(prev => response?.name)
       setEmail(prev => response?.email)
       setCity((prev) => response?.adress?.city);
       setQuoute((prev) => response?.adress?.qoute);
       setCep((prev) => response?.adress?.cep);
     }
     get();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [reload]);
  return (
    <section id="acount">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Meus Dados</h1>
            <form onSubmit={async(e) => {
              e.preventDefault()
              if (!name || !city || !qoute || !cep || !email || !password || password?.length < 8) {
                return toast.warn("Preencha todos campos obrigatórios")
              } else {
                if (newPass && newPass?.length < 8) {
                  return toast.warn("8 caracteres no mínimo");
                }
                const admin = {
                  city: city,
                  cep: cep,
                  qoute: qoute,
                  email: email,
                  name: name,
                  password:newPass?.length > 0 ? newPass : password,
                  oldpassword: password
                };
                const response = await updateAdmin(admin)
                console.log(response)
                if (response == "wrong password") {
                  return toast.warn("Palavra passe Errada")
                } else if (response) {
                  setReload(prev => !prev)
                  return toast.success("Alterado com sucesso");
                } else {
                  return toast.error("Dados inválidos");
                }
              }
          }}>
            <div>
              <FaUser />
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                placeholder="Entre com o nome"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <FaUser />
              <label htmlFor="cep">Cep</label>
              <input
                id="cep"
                placeholder="Entre com o cep"
                required
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
              />
            </div>
            <div>
              <FaLocationArrow />
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                placeholder="Entre com a cidade"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div>
              <FaLocationArrow />
              <label htmlFor="qoute">Bairro</label>
              <input
                id="qoute"
                placeholder="Entre com o bairro"
                required
                value={qoute}
                onChange={(e) => {
                  setQuoute(e.target.value);
                }}
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
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>
            <div>
              <FaLock />
              <label htmlFor="passwod">Nova Senha</label>
              <input
                id="passwod"
                type="passwod"
                placeholder="Opcional"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
            </div>
            <p></p>
            <button>Atualizar</button>
          </form>
        </>
      )}
    </section>
  );
}
