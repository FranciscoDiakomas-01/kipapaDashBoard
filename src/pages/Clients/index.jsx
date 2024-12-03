import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { getAllClient , deleteClientById } from '../../services/clients';
import { useState, useEffect } from "react";
export default function Clients() {

  const [isloading, setIsLoading] = useState(true);
  const [client, setClient] = useState([1])
  const [page, setPage] = useState(1)
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  useEffect(() => {
    async function get() {
      const response = await getAllClient(page, 10);
      setClient(response?.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.page,
          lastPage: response?.laspage,
        }));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const interval = setInterval(() => {
    get();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [page , reload]);
 return (
   <section id="user">
     <div>
       <h1>Clientes</h1>
     </div>
     <>
       {isloading ? (
         <div>
           <Loader />
         </div>
       ) : (
         <>
           {Array.isArray(client) && client?.length > 0 ? (
             <>
               <article>
                 {client?.map((item, index) => (
                   <figure key={index}>
                     <span
                       style={{
                         backgroundColor: "var(--pink)",
                       }}
                     >
                       {item?.name?.slice(0, 3)}
                     </span>
                     <strong>{item?.name + " " + item?.lastname}</strong>
                     <i>{item.email}</i>
                     <button
                       onClick={async () => {
                         await deleteClientById(item?.id);
                         toast.success("Deletado com sucesso!");
                         setReload((prev) => !prev);
                       }}
                     >
                       Eliminar
                     </button>
                   </figure>
                 ))}
               </article>
               <span>
                 <p>
                   {pagination.currentPage} de {pagination.lastPage}
                 </p>
                 <div>
                   <button
                     onClick={() => {
                       if (page <= 1) {
                         return;
                       } else {
                         setPage((prev) => prev - 1);
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
                         return;
                       }
                     }}
                   >
                     Next
                   </button>
                 </div>
               </span>
             </>
           ) : (
             <h1
               style={{
                 color: "var(--pink)",
                 fontSize: "22pt",
                 textAlign: "center",
                 marginTop: "100px1q",
               }}
             >
               Nenhum cliente Cadastrado
             </h1>
           )}
         </>
       )}
     </>
   </section>
 );
}