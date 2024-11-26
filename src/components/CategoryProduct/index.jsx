/* eslint-disable react/prop-types */
import './index.css'

export default function CategoryForm({close}) {
 return (
   <section id="productForm">
     <form>
       <span>
        <h1>Foto</h1>
         <input type="file" />
       </span>
       <article>
         <div>
           <label htmlFor="name">Nome</label>
           <input id="name" placeholder="Entre com o nome" />
         </div>
         <div>
           <label htmlFor="description">Descrição</label>
           <input id="description" placeholder="Entre com a descrição" />
         </div>
       </article>
       <div>
         <button type="submit">Criar</button>
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
   </section>
 );
}