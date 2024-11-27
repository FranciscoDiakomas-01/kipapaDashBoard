import './index.css';
export default function Main() {

const dashboard = [
      {
        name: "Produtos",
        value: 100,
      },
      {
        name: "Categorias",
        value: 100,
      },
      {
        name: "Pedidos",
        value: 100,
      },
      {
        name: "Clientes",
        value: 100,
      },
      {
        name: "Entregadores",
        value: 100,
      },
      {
        name: "Orçamento",
        value: 1000,
      },
];
const latestOrders = [
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 2,
  },
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 1,
  },
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 1,
  },
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 2,
  },
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 3,
  },
  {
    id: 10,
    totalPay: 4000,
    product: 1,
    status: 4,
  }
];
 return (
   <section id="dash">
     <article>
       {dashboard.map((item, index) => (
         <aside key={index}>
           <h1>{item.name}</h1>
           <span>
             {index == dashboard.length - 1
               ? Number(item.value).toLocaleString("pt") + "kz"
               : item.value}
           </span>
         </aside>
       ))}
     </article>
     <h1>Últimos Pedidos</h1>
     {Array.isArray(latestOrders) && latestOrders?.length > 0 && (
       <table>
         <thead>
           <tr>
             <td>Pedido Nº</td>
             <td>Valor Pago</td>
             <td>Produtos</td>
             <td>Estaus</td>
           </tr>
         </thead>
         <tbody>
           {latestOrders.map((item, index) => (
             <tr key={index}>
               <td>{item.id}</td>
               <td>{Number(item.totalPay).toLocaleString("pt")}kz</td>
               <td>{item.product}</td>
               <td>
                 {item.status == 1 ? (
                   <p
                     style={{
                       backgroundColor: "var(--green)",
                     }}
                   >
                     Concluído
                   </p>
                 ) : item.status == 2 ? (
                   <p
                     style={{
                       backgroundColor: "var(--yellow)",
                     }}
                   >
                     Em Progresso
                   </p>
                 ) : item.status == 3 ? (
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
     )}
   </section>
 );
}