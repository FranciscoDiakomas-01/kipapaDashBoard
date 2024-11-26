import './index.css'
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/pngegg (9).png'
import Loader from '../../components/Loader';
import ProductForm from '../../components/ProductForm';
import ProductDetails from '../../components/ProductDetails';
import { useState, useEffect } from 'react';

export default function Product() {
  const [isAdd , setIsAdd] = useState(false)
  const [isloading, setIsLoading] = useState(true)
  const [isDetails , setDetails] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  },[])
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
     {isAdd && <ProductForm close={setIsAdd} />}
     {isDetails && <ProductDetails close={setDetails} />}
     <span>
       <h1>Produtos</h1>
       <button
         onClick={() => {
           setIsAdd(true);
         }}
       >
         + Add
       </button>
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
           <>
             {isloading ? (
               <Loader />
             ) : (
               <aside>
                 {demo.map((item, index) => (
                   <figure key={index}>
                     <img src={item.img_url} />
                     <strong>{item.name}</strong>
                     <div>
                       <p>
                         {Number(item?.current_price).toLocaleString("pt")}kz
                       </p>
                       <del>
                         {item.old_price != 0 &&
                           Number(item?.old_price).toLocaleString("pt") + "kz"}
                       </del>
                     </div>
                     <button onClick={() => {
                       setDetails(true)
                     }}>Detalhes</button>
                   </figure>
                 ))}
               </aside>
             )}
           </>
         ) : (
           <h1>Nenhum Produto Cadastrado</h1>
         )}
       </div>
     </article>
   </section>
 );
}