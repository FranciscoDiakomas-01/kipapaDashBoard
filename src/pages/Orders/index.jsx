/* eslint-disable no-unused-vars */
import './inex.css'
import { useState , useEffect } from 'react';
import generateColor from './../../services/generateColor';
import { getAllOrders, getOrderByID, UpdateOrderDelivery, UpdateOrderStatus } from '../../services/Orders';
import { getClientById } from '../../services/clients'
import { getAllUsercategory } from '../../services/CategoryUSer'
import { getAllUserrByCategory } from '../../services/User'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';
export default function Orders() {
  const [tab, setTab] = useState(1)
  const [activeRow, setActiveRow] = useState(0)
  const [page , setPage] = useState(1)
  const [orderUser, setUserOrder] = useState(false)
  const [isLoading, setLoading] = useState(true);
  const [isLoading1, setLoading1] = useState(false);
  const [Orders, setOrders] = useState([])
  const [client , setClient] = useState([])
  const [orderDetails, setOrderDetails] = useState()
  const [usersCategory , setUserCategory] = useState()
  const [reload, setReload] = useState(false);
  const [users , setUsers] = useState([])
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  useEffect(() => {
    setLoading(prev => true)
    async function getAll() {
      const response2 = await getAllUsercategory()
      setUserCategory(prev =>response2?.data )
      const response = await getAllOrders(page, 20 , tab);
      setOrders(response?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: response?.page,
        lastPage: response?.latPage,
      }));
    }
     setTimeout(async () => {
       setLoading(false);
     }, 2000);
    
    const interval = setInterval(() => {
     getAll();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [page, reload , tab]);
  async function getOrerPerId(id, clientId) {
    const response = await getOrderByID(id)
    const reponse1 = await getClientById(clientId);
    setClient(reponse1)
    setOrderDetails(response[0]);
     setTimeout(async () => {
       setLoading1(false);
     }, 1500);
  }
 return (
   <section id="orders">
     <article>
       <div>
         <button
           onClick={() => {
             setTab(1);
             setPage((prev) => 1);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 1 ? "var(--yellow)" : "",
             border: tab == 1 ? "solid 1px" : "",
           }}
         >
           Em progresso
         </button>
         <button
           onClick={() => {
             setTab(2);
             setPage((prev) => 1);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 2 ? "var(--blue)" : "",
             border: tab == 2 ? "solid 1px" : "",
           }}
         >
           Á entrega
         </button>

         <button
           onClick={() => {
             setTab(4);
             setPage((prev) => 1);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 4 ? "red" : "",
             border: tab == 4 ? "solid 1px" : "",
           }}
         >
           Cancelados
         </button>
         <button
           onClick={() => {
             setTab(3);
             setPage((prev) => 1);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 3 ? "var(--green)" : "",
             border: tab == 3 ? "solid 1px" : "",
           }}
         >
           Concluído
         </button>
       </div>
       <div>
         {isLoading ? (
           <Loader />
         ) : (
           <table>
             <thead>
               <tr>
                 <td>Pedido Nº</td>
                 <td>Data</td>
                 <td>Estatus</td>
               </tr>
             </thead>
             <tbody>
               {Orders?.length > 0 &&
                 Orders.map((order) => (
                   <tr
                     key={order?.id}
                     onClick={async () => {
                       setActiveRow(order?.id);
                       setLoading1(true)
                       await getOrerPerId(order?.id, order?.clientid);
                     }}
                     style={{
                       backgroundColor:
                         activeRow == order?.id ? "var(--pink2)" : "",
                       cursor: "pointer",
                     }}
                   >
                     <td>#{order?.id}</td>
                     <td>{order?.created_at}</td>
                     <td>
                       <p
                         style={{
                           backgroundColor:
                             tab == 1
                               ? "var(--yellow)"
                               : tab == 2
                               ? "var(--blue)"
                               : tab == 3
                               ? "var(--green)"
                               : "",
                           cursor: "pointer",
                         }}
                       >
                         {tab == 1
                           ? "Em progresso"
                           : tab == 2
                           ? "Á entrega"
                           : tab == 3
                           ? "Concluído"
                           : "Cancelado"}
                       </p>
                     </td>
                   </tr>
                 ))}
             </tbody>
           </table>
         )}
       </div>
       <span>
         <p>
           {pagination.currentPage} de
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
               if (pagination?.lastPage == page || pagination?.lastPage == 0) {
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
     </article>
     <aside>
       {activeRow != 0 && (
         <>
           {isLoading1 ? (
             <Loader />
           ) : (
             <>
               <span>
                 <h1>Pedido Nº # {orderDetails?.id} </h1>
                 {orderDetails?.status != 3 && (
                   <>
                     {" "}
                     <select
                       onChange={async (e) => {
                           //update order status
                       setActiveRow(0);
                         if (e.target.value == 0) {
                           return;
                         }
                         const response = await UpdateOrderStatus(
                           orderDetails?.id,
                           e.target.value
                         );
                         if (response) {
                           toast.success("Alterado com Sucesso!");
                           return setReload((prev) => !prev);
                         } else {
                           toast.error("Erro ao Alterar!");
                           return;
                         }
                       }}
                     >
                       <option value={0}>Estado</option>
                       <option value={1}>Em progresso</option>
                       <option value={2}>Á entrega</option>
                       <option value={4}>Cancelar</option>
                     </select>
                   </>
                 )}
               </span>
               <div>
                 {orderDetails &&
                   orderDetails?.orders_food?.length > 0 &&
                   orderDetails?.orders_food?.map((food) => (
                     <figure key={food?.name}>
                       <span>
                         <img src={food?.image_url} />
                         <p>{food?.name}</p>
                       </span>
                       <div>
                         <p>Quantidade : {food?.qtd} </p>
                         <p>
                           Preço : {Number(food?.price).toLocaleString("pt")}kz
                         </p>
                         <p>
                           Total :
                           {Number(food?.price * food?.qtd).toLocaleString(
                             "pt"
                           )}
                           kz
                         </p>
                       </div>
                     </figure>
                   ))}
               </div>
               <article>
                 <div>
                   <p>Cliente: </p>
                   <i>
                     {client?.name + " " + client?.lastname} 
                   </i>
                 </div>
                 <div>
                   <p>Email: </p>
                   <i>{client?.email}</i>
                 </div>
                 <div>
                   <p>Endereço:</p>
                   <i
                     style={{
                       wordBreak: "break-all",
                     }}
                   >
                     {String(
                       orderDetails?.adress.city +
                         " / " +
                         orderDetails?.adress.qoute +
                         " / " +
                         orderDetails?.adress.cep?.trim()
                     ).toLocaleLowerCase()}
                   </i>
                 </div>
                 <div>
                   <p>Orçamento : </p>
                   <i>
                     {Number(
                       orderDetails?.order_detais?.total_Pay
                     ).toLocaleString("pt")}
                     kz
                   </i>
                 </div>
                 <div>
                   <p>Produtos : </p>
                   <i>{Number(orderDetails?.order_detais?.totalPoduct)}</i>
                 </div>

                 <div>
                   <p>Forma de Pagamento : </p>
                   <i>
                     {" "}
                     {String(
                       orderDetails?.order_detais?.payForm
                     ).toLocaleLowerCase()}{" "}
                   </i>
                 </div>
                 <div>
                   {orderDetails?.status != 3 && (
                     <div>
                       <button
                         onClick={() => {
                           setUserOrder(() => true);
                         }}
                       >
                         Adicionar Entregador
                       </button>

                       <button
                         onClick={async () => {
                          
                            setActiveRow(0);
                           const response = await UpdateOrderStatus(
                             orderDetails?.id,
                             3
                           );
                           if (response) {
                             toast.success("Alterado com Sucesso!");
                             return setReload((prev) => !prev);
                           } else {
                             toast.error("Erro ao Alterar!");
                             return;
                           }
                         }}
                       >
                         Finalizar Pedido
                       </button>
                     </div>
                   )}
                 </div>
               </article>
             </>
           )}
         </>
       )}
     </aside>
     {orderUser && (
       <div>
         <form>
           <select
             onChange={async (e) => {
               if (e.target.value == 0) {
                 return;
               }
               const response = await getAllUserrByCategory(e.target.value);
               setUsers(response?.data);
             }}
           >
             <option value={0}>Selecione a categoria</option>
             {Array.isArray(usersCategory) &&
               usersCategory?.map((c) => (
                 <option key={c?.id} value={c?.id}>
                   {c?.title}
                 </option>
               ))}
           </select>

           <span>
             {Array.isArray(users) &&
               users?.length > 0 &&
               users.map((user) => (
                 <figure
                   key={user.id}
                   onClick={async () => {
                     //adicionar um entregador
                     const response = await UpdateOrderDelivery(
                       orderDetails?.id,
                       user?.id
                     );
                     setReload((prev) => !prev);
                     if (response) {
                       //trocar o estado para entrega
                       await UpdateOrderStatus(orderDetails?.id, 2);
                       toast.success("Entregador adicionado");
                       return setTimeout(() => {
                         setUserOrder((prev) => false);
                       }, 1500);
                     } else {
                       toast.error("Erro ao adicionar");
                       return;
                     }
                   }}
                 >
                   <p
                     style={{
                       backgroundColor: generateColor(),
                     }}
                   >
                     {user.name?.at(0)}
                   </p>
                   <strong>{user.name}</strong>
                   <i>{user.email}</i>
                 </figure>
               ))}
           </span>
           <button
             onClick={() => {
               setUserOrder(() => false);
             }}
           >
             Fechar
           </button>
         </form>
       </div>
     )}
   </section>
 );
}