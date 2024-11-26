import './index.css'
import generateColor from '../../services/generateColor';
import Loader from '../../components/Loader';
import { useState, useEffect } from "react";
import UserForm from '../../components/UserForm';
import { FaSearch } from 'react-icons/fa';
import CategoryUser from "../../components/CategoryUser";
export default function User() {
    const demo = [
      {
        id: 1,
        name: "Francisco F",
        lastName: "Diakomas",
        email: "fran@gmail.com",
        salary : 120000
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
    ];
    
  const [isloading, setIsLoading] = useState(true);
  const [isAdding, setisAdding] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
 return (
   <section id="user">
     {isAdding && <UserForm close={setisAdding} />}

     <>
       {isCategory ? (
         <CategoryUser close={setIsCategory}/>
       ) : (
         <>
           {" "}
           <div>
             <h1>Funcionários</h1>
             <div>
               <button
                 onClick={() => {
                   setIsCategory(true);
                 }}
               >
                 + Categoria
               </button>
               <button
                 onClick={() => {
                   setisAdding(true);
                 }}
               >
                 + Usuário
               </button>
             </div>
           </div>
           <form>
             <select>
               <option>Filtar por categoria</option>
             </select>
             <button>
               <FaSearch />
             </button>
           </form>
           {Array.isArray(demo) && demo?.length > 0 ? (
             <>
               {isloading ? (
                 <div>
                   <Loader />
                 </div>
               ) : (
                 <>
                   <article>
                     {demo.map((item, index) => (
                       <figure
                         key={index}
                         id="fig"
                         onMouseLeave={() => {
                           const figs =
                             document.querySelectorAll("#fig")[index];
                           const btn = figs
                             .getElementsByClassName("div")[0]
                             .getElementsByTagName("button")[0];

                           if (btn.textContent == "Menos detalhes") {
                             btn.click();
                           }
                         }}
                       >
                         <article>
                           <div>
                             <span
                               style={{
                                 backgroundColor: generateColor(),
                               }}
                             >
                               {item.name.at(0) + item.lastName.at(0)}
                             </span>
                             <strong>{item.name + " " + item.lastName}</strong>
                             <i>{item.email}</i>
                           </div>
                           <aside>
                             <strong>
                               Salário : {Number(20000).toLocaleString("pt")}kz{" "}
                             </strong>
                             <strong>Categoria : Entregador</strong>
                             <strong>Município : Kilamba Kiaxi </strong>
                             <strong>Bairro : Bairro </strong>
                             <strong>Cep : 102935679087</strong>
                           </aside>
                         </article>
                         <div className="div">
                           <button
                             onClick={() => {
                               const figs =
                                 document.querySelectorAll("#fig")[index];
                               const btn = figs
                                 .getElementsByClassName("div")[0]
                                 .getElementsByTagName("button")[0];

                               if (btn.textContent == "Mais detalhes") {
                                 btn.textContent = "Menos detalhes";
                               } else {
                                 btn.textContent = "Mais detalhes";
                               }
                               const article =
                                 figs.getElementsByTagName("article")[0];
                               article.classList.toggle("apaer");
                             }}
                           >
                             Mais detalhes
                           </button>
                           <button>Eliminar</button>
                         </div>
                       </figure>
                     ))}
                   </article>
                   <span>
                     <p>x de y</p>
                     <div>
                       <button>Prev</button>
                       <button>Next</button>
                     </div>
                   </span>
                 </>
               )}
             </>
           ) : (
             <h1>Nehum Entragador cadatrado</h1>
           )}
         </>
       )}
     </>
   </section>
 );
}