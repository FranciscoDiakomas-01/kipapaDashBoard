import './inex.css'
import img from '../../assets/pngegg (9).png'
import { useState } from 'react';
import generateColor from './../../services/generateColor';
export default function Orders() {
  const [tab, setTab] = useState(1)
  const [activeRow, setActiveRow] = useState(0)
  const [orderUser , setUserOrder]= useState(false)
  const orders = [
    {
      id: 100,
      date: new Date().toLocaleDateString("pt"),
      total: Number(200).toLocaleString("pt") + " kz",
    },
    {
      id: 2,
      date: new Date().toLocaleDateString("pt"),
      total: Number(4000).toLocaleString("pt") + " kz",
    },
  ];
 return (
   <section id="orders">
     <article>
       <div>
         <button
           onClick={() => {
             setTab(1);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 1 ? "var(--pink)" : "",
             border: tab == 1 ? "solid 1px" : "",
           }}
         >
           Em progresso
         </button>
         <button
           onClick={() => {
             setTab(2);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 2 ? "var(--pink)" : "",
             border: tab == 2 ? "solid 1px" : "",
           }}
         >
           Á entrega
         </button>
         <button
           onClick={() => {
             setTab(3);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 3 ? "var(--pink)" : "",
             border: tab == 3 ? "solid 1px" : "",
           }}
         >
           Concluído
         </button>
         <button
           onClick={() => {
             setTab(4);
             setActiveRow(() => 0);
           }}
           style={{
             color: tab == 4 ? "var(--pink)" : "",
             border: tab == 4 ? "solid 1px" : "",
           }}
         >
           Cancelados
         </button>
       </div>
       <div>
         <table>
           <thead>
             <tr>
               <td>Nº</td>
               <td>Data</td>
               <td>Total</td>
               <td>Estatus</td>
             </tr>
           </thead>
           <tbody>
             {orders.map((order) => (
               <tr
                 key={order.id}
                 onClick={() => {
                   setActiveRow(order.id);
                 }}
                 style={{
                   backgroundColor: activeRow == order.id ? "var(--pink2)" : "",
                   cursor: "pointer",
                 }}
               >
                 <td>{order.id}</td>
                 <td>{order.date}</td>
                 <td>{order.total}</td>
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
       </div>
       <span>
         <p>x de y</p>
         <div>
           <button>Next</button>
           <button>Prev</button>
         </div>
       </span>
     </article>
     <aside>
       {activeRow != 0 && (
         <>
           <span>
             <h1>Pedido Nº #04333 </h1>
             <select>
               <option>Estado</option>
               <option>Em progresso</option>
               <option>Á entrega</option>
               <option>Cancelar</option>
             </select>
           </span>
           <div>
             <figure>
               <span>
                 <img src={img} />
                 <p>Pizza</p>
               </span>
               <div>
                 <p>Quantidade : 2</p>
                 <p>Preço : {Number(2000).toLocaleString("pt")}kz </p>
                 <p>Total : {Number(2000 * 2).toLocaleString("pt")}kz </p>
               </div>
             </figure>
             <figure>
               <span>
                 <img src={img} />
                 <p>Pizza</p>
               </span>
               <div>
                 <p>Quantidade : 2</p>
                 <p>Preço : {Number(2000).toLocaleString("pt")}kz </p>
                 <p>Total : {Number(2000 * 2).toLocaleString("pt")}kz </p>
               </div>
             </figure>
             <figure>
               <span>
                 <img src={img} />
                 <p>Pizza</p>
               </span>
               <div>
                 <p>Quantidade : 2</p>
                 <p>Preço : {Number(2000).toLocaleString("pt")}kz </p>
                 <p>Total : {Number(2000 * 2).toLocaleString("pt")}kz </p>
               </div>
             </figure>
             <figure>
               <span>
                 <img src={img} />
                 <p>Pizza</p>
               </span>
               <div>
                 <p>Quantidade : 2</p>
                 <p>Preço : {Number(2000).toLocaleString("pt")}kz </p>
                 <p>Total : {Number(2000 * 2).toLocaleString("pt")}kz </p>
               </div>
             </figure>
             <figure>
               <span>
                 <img src={img} />
                 <p>Pizza</p>
               </span>
               <div>
                 <p>Quantidade : 2</p>
                 <p>Preço : {Number(2000).toLocaleString("pt")}kz </p>
                 <p>Total : {Number(2000 * 2).toLocaleString("pt")}kz </p>
               </div>
             </figure>
           </div>
           <article>
             <div>
               <p>Cliente : </p>
               <i>Francisco Diakomas</i>
             </div>
             <div>
               <p>Email :</p>
               <i>fr@gmail.com</i>
             </div>
             <div>
               <p>Endereço : </p>
               <i>Cacuaco/xxx/0912345</i>
             </div>
             <div>
               <p>Total à Pagar : </p>
               <i>10000</i>
             </div>
             <div>
               <p>Forma de Pagamento : </p>
               <i> Pix </i>
             </div>
             <div>
               <button>Finalizar Pedido</button>
               <button
                 onClick={() => {
                   setUserOrder(() => true);
                 }}
               >
                 Adicionar Entregador
               </button>
             </div>
           </article>
         </>
       )}
     </aside>
     {orderUser && (
       <div>
         <form>
           <select>
             <option>Selecione a categoria</option>
           </select>
           <span>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
             <figure>
               <p
                 style={{
                   backgroundColor: generateColor(),
                 }}
               >
                 FDK
               </p>
               <strong>Francisco Diakomas</strong>
               <i>francisco@gmail.com.br</i>
             </figure>
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