import './index.css';
import { getDashBoard } from '../../services/getAdminData';
import { getLatestOrders} from '../../services/Orders'
import { useState , useEffect } from 'react';
export default function Main() {
  
  const [DashBoard, setDashBoard] = useState([]);
  const [orders , setOrders] = useState([])
  useEffect(() => {
    
    async function get() {
      const response = await getDashBoard()
      const response1 = await getLatestOrders();
      console.log(response1)
      setDashBoard(response?.data)
      setOrders(response1)
    }
    get()

  },[])
 return (
   <section id="dash">
     <article>
       {Array.isArray(DashBoard) &&
         DashBoard.length > 0 &&
         DashBoard.map((item, index) => (
           <aside key={index}>
             <h1>
               {index == 0
                 ? "Total Produtos"
                 : index == 1
                 ? "Categoria Produtos"
                 : index == 2
                 ? "Total Pedidos"
                 : index == 3
                 ? "Total Funcionários"
                 : index == 4
                 ? "Total Clientes"
                 : "Categoria Funcionários"}
             </h1>
             <span>{item?.total}</span>
           </aside>
         ))}
     </article>
     {Array.isArray(orders) && orders?.length > 0 && (
       <>
         <h1>Últimos Pedidos</h1>
         <table>
           <thead>
             <tr>
               <td>Pedido Nº</td>
               <td>Data</td>
               <td>F. Pagamento</td>
               <td>Valor Pago</td>
               <td>Total Produtos</td>
               <td>Estaus</td>
             </tr>
           </thead>
           <tbody>
             {orders.map((item, index) => (
               <tr key={index}>
                 <td>{item.id}</td>
                 <td>{item.created_at}</td>
                 <td>
                   {String(item?.order_detais?.payForm).toLocaleLowerCase()}
                 </td>
                 <td>
                   {Number(item?.order_detais?.total_Pay).toLocaleString("pt")}
                   kz
                 </td>
                 <td>{item?.order_detais?.totalPoduct}</td>
                 <td>
                   {item.status == 3 ? (
                     <p
                       style={{
                         backgroundColor: "var(--green)",
                       }}
                     >
                       Concluído
                     </p>
                   ) : item.status == 1 ? (
                     <p
                       style={{
                         backgroundColor: "var(--yellow)",
                       }}
                     >
                       Em Produção
                     </p>
                   ) : item.status == 2 ? (
                     <p
                       style={{
                         backgroundColor: "var(--blue)",
                       }}
                     >
                       Á entrega
                     </p>
                   ) : (
                     <p>Cancelado</p>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </>
     )}
   </section>
 );
}