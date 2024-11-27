import './index.css'
import logo from '../../assets/321097281_1948082938901845_9073110493333833804_n.jpg'
export default function Login() {
 return (
   <section id="login">
     <form>
       <div>
         <div>
           <img src={logo} />
           <h1>kipapa</h1>
         </div>
         <label>Email</label>
         <input placeholder="exemplo@kipapa.com" type="email" required />
         <label>Palavra passe</label>
         <input placeholder="sua senha" type="password" required />
         <button>Entrar</button>
         <p>Seja Bem vindo Administrador</p>
       </div>
     </form>
     <article></article>
   </section>
 );
}