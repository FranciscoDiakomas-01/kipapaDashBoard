/* eslint-disable react/prop-types */
import './index.css'
import { FaRegTrashCan } from 'react-icons/fa6';
export default function ProductDetails({ close }) {
 return (
   <section id="productForm">
     <figure>
       <div>
         <button>
           <FaRegTrashCan/>
         </button>
       </div>
       <form>
         <article>
           <div>
             <label htmlFor="name">Nome</label>
             <input id="name" placeholder="Entre com o nome" />
           </div>
           <div>
             <label htmlFor="price">Preço</label>
             <input id="price" placeholder="Entre com o preço" type="number" />
           </div>
           <div>
             <label htmlFor="category">Categoria</label>
             <select id="category">
               <option>Selecione uma categoria</option>
             </select>
           </div>
           <div>
             <label htmlFor="description">Descrição</label>
             <input id="description" placeholder="Entre com a descrição" />
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
             cancelar
           </button>
         </div>
       </form>
     </figure>
   </section>
 );
}