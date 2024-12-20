import './index.css'
import login from '../../services/login';
import logo from '../../assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import Loader from '../../components/Loader'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [emailValidation , setValidationEmail]= useState(false)
  const [passWordValidation, setPassWordValidation] = useState(false);
  const[isLoading , setIsloading] = useState(false)
  async function handelOnSubmit(e) {
    e.preventDefault()
    //validation
    if (email?.length < 5) {
      setValidationEmail(true)
      return
    } else if (password?.length < 8) {
      setPassWordValidation(true)
      return 
    } else {
      setIsloading(true)
      const userData = {
        email,
        password
      }
      const pResponse = document.getElementById("response")
      const response = await login(userData)
      if (response == false) {
        pResponse.textContent = "Dados incorrectos!"  
        pResponse.style.color = "red";
        setIsloading(false);
        return
      } else {
        setTimeout(() => {
        setIsloading(false);
          pResponse.textContent = "Lodado com sucesso!";
          pResponse.style.color = "var(--green)";
        },2000)
        
        setTimeout(() => {
          nav("/");
        }, 3000);
        return;
      }
    }
  }
 return (
   <section id="login">
     <form onSubmit={handelOnSubmit}>
       <div>
         <div>
           <img src={logo} />
           <h1>kipapa</h1>
         </div>
         <h1
           style={{
             textAlign: "center",
             color: "var(--pink)",
           }}
         >
           ADMIN
         </h1>
         <label>Email</label>
         <input
           placeholder="exemplo@kipapa.com"
           type="email"
           onChange={(e) => {
             setEmail(e.target.value);
             setValidationEmail(false);
           }}
         />
         {emailValidation && (
           <p
             style={{
               color: "red",
               textAlign: "start",
             }}
           >
             Email inválido
           </p>
         )}
         <label>Palavra passe</label>
         <input
           placeholder="sua senha"
           type="password"
           onChange={(e) => {
             setPassword(e.target.value);
             setPassWordValidation(false);
           }}
         />
         {passWordValidation && (
           <p
             style={{
               color: "red",
               textAlign: "start",
             }}
           >
             Senha inválida
           </p>
         )}
         <button type="submit">Entrar</button>
         <p id="response"></p>
         {isLoading && <Loader />}
       </div>
     </form>

     <article></article>
   </section>
 );
}