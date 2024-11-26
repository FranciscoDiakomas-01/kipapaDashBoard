import './index.css'
import logo from '../../assets/pngegg (9).png'
import Loader from '../../components/Loader';
import { FaRegTrashAlt , FaRegEye } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CategoryForm from '../../components/CategoryForm';

export default function Category() {
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
        description:"MolhoPicanteMolhPicanteMolhoPicanteMolhoPicanteMolhoPicanteMolhoicanteMolhoPicanteMolho",
        id: 1,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Pizza",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
      {
        name: "Hamburguer",
        description: "Molho Picante",
        id: 1,
        img_url: logo,
      },
    ];
 return (
   <section id="category">
     {isAdd && <CategoryForm close={setIsAdd} />}
     <span>
       <h1>Categorias</h1>
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
         {Array.isArray(demo) && demo?.length > 0 ? (
           <>
             {isloading ? (
               <Loader />
             ) : (
               <aside>
                 {demo.map((item, index) => (
                   <figure key={index}>
                     <span>
                       <div>
                         <img src={item.img_url} />
                         <strong>{item.name}</strong>
                       </div>
                       <p>{item.description}</p>
                     </span>
                     <div>
                       <button
                         onClick={() => {
                           setDetails(true);
                         }}
                       >
                         <FaRegEye />
                       </button>
                       <button>
                         <FaRegTrashAlt />
                       </button>
                     </div>
                   </figure>
                 ))}
               </aside>
             )}
           </>
         ) : (
           <h1>Nenhum Produto Cadastrado</h1>
         )}
       </div>
       <span>
         <p>x de y</p>
         <div>
           <button>Prev</button>
           <button>Next</button>
         </div>
       </span>
     </article>
   </section>
 );
}