/* eslint-disable no-unused-vars */
import './index.css'
import generateColor from '../../services/generateColor';
import Loader from '../../components/Loader';
import { useState, useEffect } from "react";
import UserForm from '../../components/UserForm';
import { FaSearch } from 'react-icons/fa';
import CategoryUser from "../../components/CategoryUser";
import { getAllUsers, getAllUserrByCategory, deleteUserById} from '../../services/User';
import { getAllUsercategory } from '../../services/CategoryUSer';
import { toast } from 'react-toastify';
export default function User() {
  const [isloading, setIsLoading] = useState(true);
  const [isAdding, setisAdding] = useState(false);
  const [users, setUsers] = useState([1])
  const [page, setPage] = useState(1)
  const [reload, setReload] = useState(false);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  const [isCategory, setIsCategory] = useState(false);
  useEffect(() => {

    async function get() {
      const response1 = await getAllUsercategory();
      setCategory(response1?.data);
      if (filter == "all") {
        const response = await getAllUsers(page, 10);
        setUsers(response?.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.page,
          lastPage: response?.laspage,
        }));
        return;
      } else {
        const response = await getAllUserrByCategory(page, 10, filter);
        setUsers((prev) => response?.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.page,
          lastPage: response?.laspage,
        }));
        return
      }
    }
    get()
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [page , reload , filter]);
 return (
   <section id="user">
     {isAdding && <UserForm close={setisAdding} category={category} reload={setReload}  />}

     <>
       {isCategory ? (
         <CategoryUser close={setIsCategory} reloadOnReturn={setReload}/>
       ) : (
         <>
           <div>
             <h1>Funcionários</h1>
             <div>
               <button
                 onClick={() => {
                   setIsCategory(true);
                 }}
               >
                 Categoria
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
             <select
               onChange={(e) => {
                 setFilter((prev) => e.target.value);
               }}
             >
               <option value={"all"}>Filtar por categoria</option>
               <option value={"all"}>Todas categorias</option>
               {Array.isArray(category) &&
                 category?.map((c) => (
                   <option key={c?.id} value={c?.id}>
                     {c?.title}
                   </option>
                 ))}
             </select>
             <button>
               <FaSearch />
             </button>
           </form>
           {Array.isArray(users) && users?.length > 0 ? (
             <>
               {isloading ? (
                 <div>
                   <Loader />
                 </div>
               ) : (
                 <>
                   <article>
                     {users.map((item, index) => (
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
                               {item?.name?.at(0) + item?.lastname?.at(0)}
                             </span>
                             <strong>
                               {item?.name + " " + item?.lastname}
                             </strong>
                             <i>{item.email}</i>
                           </div>
                           <aside>
                             <strong>
                               Salário :{" "}
                               {Number(item?.salary).toLocaleString("pt")}kz{" "}
                             </strong>
                             <strong>Categoria : {item?.category} </strong>
                             <strong>Município : {item?.adress?.city} </strong>
                             <strong>Bairro : {item?.adress?.qoute} </strong>
                             <strong>Cep : {item?.adress?.cep} </strong>
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
                           <button onClick={async () => {
                             await deleteUserById(item?.id)
                             setReload(prev => !prev)
                             toast.success("Deletado com sucesso!")
                             return
                           }}>Eliminar</button>
                         </div>
                       </figure>
                     ))}
                   </article>
                   <span>
                     <p>
                       {pagination.currentPage} de{" "}
                       {pagination.lastPage == 0
                         ? pagination.lastPage + 1
                         : pagination.lastPage}
                     </p>
                     <div>
                       <button
                         onClick={() => {
                           if (page <= 1) {
                             return;
                           } else {
                             setPage((prev) => prev - 1);
                             setReload((prev) => !prev);
                             return;
                           }
                         }}
                       >
                         Prev
                       </button>
                       <button
                         onClick={() => {
                           if (
                             pagination?.lastPage == page ||
                             pagination?.lastPage == 0
                           ) {
                             return;
                           } else {
                             setPage((prev) => prev + 1);
                             setReload((prev) => !prev);
                             return;
                           }
                         }}
                       >
                         Next
                       </button>
                     </div>
                   </span>
                 </>
               )}
             </>
           ) : (
                 <h1 style={{
                   textAlign: 'center',
                   color: 'var(--pink)',
                   fontSize: '22pt',
                   marginTop : '100px'
             }}>Nehum Funcionário cadatrado</h1>
           )}
         </>
       )}
     </>
   </section>
 );
}