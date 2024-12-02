/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './index.css'
import { FaRegTrashCan } from 'react-icons/fa6';
import { getProductById , UpdateProduct , deleteProductById } from '../../services/Product';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';
export default function ProductDetails({ close ,reload }) {
  const[name , setName] = useState("")
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function get() {
      const response = await getProductById()
      setName((prev) => response?.name);
      setDescription((prev) => response?.description);
      setPrice((prev) => response?.current_price);
      setCategoryID((prev) => response?.categoryid);
      sessionStorage.setItem("curPice" , response?.current_price)
    }
    get()
    setTimeout(() => {
      setIsLoading(false)
    },1500)
  }, [])
  async function Update(e) {
    e.preventDefault()
    //validation
    if (name?.length < 5 || description?.length < 5 || isNaN(price) || price < 500) {
      toast.error("Dados Inválidos")
      return
    } else {
      
      const body = {
        categoryId: categoryId,
        price: price,
        name: name,
        description: description,
        olprice: sessionStorage.getItem("curPice")
      };
      if (body.olprice == body.price) {
        body.olprice = 0
      }
      const response = await UpdateProduct(body);
      if (response?.data == "updated") {
        toast.success("Actualizado com sucesso!")
        reload(prev => !prev)
        setTimeout(()=>{close(prev => false)},1500)
        return 
      }else {
        toast.error("Erro ao Actualizar!");
        return;
      }
    }
  }
 return (
   <section id="ProductDetails">
     <figure>
       <div>
         <button
           onClick={async () => {
             const response = await deleteProductById();
             if (response) {
               toast.success("Deletado com sucesso!");
               reload((prev) => !prev);
               setTimeout(() => {
                 close((prev) => false);
               }, 500);
               return;
             } else {
               toast.error("Erro ao Deletar!");
               return;
             }
           }}
         >
           <FaRegTrashCan />
         </button>
       </div>
       {isLoading ? (
         <Loader />
       ) : (
         <form onSubmit={Update}>
           <article>
             <div>
               <label htmlFor="name">Nome</label>
               <input
                 id="name"
                 value={name}
                 placeholder="Entre com o nome"
                 onChange={(e) => {
                   setName((prev) => e.target.value);
                 }}
               />
             </div>
             <div>
               <label htmlFor="price">Preço</label>
               <input
                 value={price}
                 id="price"
                 placeholder="Entre com o preço"
                 type="number"
                 onChange={(e) => {
                   setPrice((prev) => e.target.value);
                 }}
               />
             </div>
             <div>
               <label htmlFor="description">Descrição</label>
               <input
                 value={description}
                 id="description"
                 placeholder="Entre com a descrição"
                 onChange={(e) => {
                   setDescription((prev) => e.target.value);
                 }}
               />
             </div>
           </article>
           <div>
             <button type="submit">Actualizar</button>
             <button
               type="button"
               onClick={() => {
                 close(false);
               }}
             >
               Fechar
             </button>
           </div>
         </form>
       )}
     </figure>
   </section>
 );
}