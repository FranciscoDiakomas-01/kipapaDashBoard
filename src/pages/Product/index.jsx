import './index.css'
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/pngegg (9).png'
export default function Product() {
    const demo = [
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        current_price: 2000,
        old_price: 3000,
        img_url: logo,
      },
    ];
 return (
   <section id="product">
     <span>
       <h1>Produtos</h1>
       <button>+ Add</button>
     </span>

     <article>
       <div>
         <form>
           <select>
             <option>Filtar por categoria</option>
           </select>
           <button>
             <FaSearch />
           </button>
         </form>
         {Array.isArray(demo) && demo?.length > 0 ? (
           <aside>
             {demo.map((item, index) => (
               <figure key={index}>
                 <img src={item.img_url} />
                 <strong>{item.name}</strong>
                 <div>
                   <p>{Number(item?.current_price).toLocaleString("pt")}kz</p>
                   <del>
                     {item.old_price != 0 &&
                       Number(item?.old_price).toLocaleString("pt") + 'kz'}
                   </del>
                 </div>
                 <figcaption>
                    {item.description}
                 </figcaption>
                 <button>Detalhes</button>
               </figure>
             ))}
           </aside>
         ) : (
           <h1>Nenhum Produto Cadastrado</h1>
         )}
       </div>

       <span>
         <p>1 de 1</p>
         <div>
           <button>Prev</button>
           <button>Next</button>
         </div>
       </span>
     </article>
   </section>
 );
}