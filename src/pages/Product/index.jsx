/* eslint-disable no-unused-vars */
import './index.css'
import { FaCircle, FaSearch } from 'react-icons/fa';
import Loader from '../../components/Loader';
import ProductForm from '../../components/ProductForm';
import ProductDetails from '../../components/ProductDetails';
import { useState, useEffect } from 'react';
import { getAllProduct , getAllProductByCategory }  from '../../services/Product';
import { getAll } from '../../services/CategoryProduct';
export default function Product() {
  const [isAdd , setIsAdd] = useState(false)
  const [isloading, setIsLoading] = useState(true)
  const [product , setProduct] = useState([1])
  const [isDetails , setDetails] = useState(false)
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  useEffect(() => {
    async function get() {
      const response1 = await getAll(1, 0);
      setCategory(response1?.data);
      if (filter == "all") {
        const response = await getAllProduct(page, 10);
        setProduct(response?.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.page,
          lastPage: response?.latPage,
        }));
        return 
      } else {
        const response = await getAllProductByCategory(page, 10, filter);
        setProduct((prev) => response?.data);
        setPagination((prev) => ({
          ...prev,
          currentPage: response?.page,
          lastPage: response?.latPage,
        }));
      }
      
    }
    get()
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [page, reload , filter])
  
  async function getByCategory(e) {
    e.preventDefault()
    if (filter == "all") {
      setReload(prev => !prev)
      return;
    } else {
      const response = await getAllProductByCategory(page, 10, filter);
      setProduct((prev) => response?.data);
    }
    
  }
 return (
   <section id="product">
     {isAdd && (
       <ProductForm close={setIsAdd} reload={setReload} category={category} />
     )}
     {isDetails && <ProductDetails close={setDetails} reload={setReload} />}
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
         <form onSubmit={getByCategory}>
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
           <button type="submit">
             <FaSearch />
           </button>
         </form>
         {Array.isArray(product) && product?.length > 0 ? (
           <>
             {isloading ? (
               <Loader />
             ) : (
               <aside>
                 {Array.isArray(product) &&
                   Array.isArray(category) &&
                   category?.length > 0 &&
                   product.map((item, index) => (
                     <figure key={index}>
                       <img src={item.img_url} />
                       <strong>{item.name}</strong>
                       <strong>
                         <FaCircle />
                         <i>{item?.title}</i>
                       </strong>
                       <div>
                         <p>
                           {Number(item?.current_price).toLocaleString("pt")}kz
                         </p>
                         {item.old_price != 0 && (
                           <del>
                             {Number(item?.old_price).toLocaleString("pt") +
                               "kz"}
                           </del>
                         )}
                       </div>
                       <button
                         onClick={() => {
                           sessionStorage.setItem("pid", item?.id);
                           setDetails(true);
                         }}
                       >
                         Detalhes
                       </button>
                     </figure>
                   ))}
               </aside>
             )}
           </>
         ) : (
           <h1>
             {category?.length == 0
               ? "Nenhuma categoria Cadastrada"
               : "Nenhum Produto Cadastrado"}
           </h1>
         )}
       </div>
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
   </section>
 );
}