/* eslint-disable react/prop-types */
import './index.css'

export default function UserForm({close}) {
 return (
   <section id="productForm">
     <form>
       <article>
         <div>
           <label htmlFor="name">Nome</label>
           <input id="name" placeholder="Entre com o nome" />
         </div>
         <div>
           <label htmlFor="lastname">Sobre nome</label>
           <input id="lastname" placeholder="Entre com o sobre nome" />
         </div>
         <div>
           <label htmlFor="category">Categoria</label>
           <select id="category">
             <option>Selecione uma categoria</option>
           </select>
         </div>
         <div>
           <label htmlFor="email">Email</label>
           <input id="email" placeholder="exemplo@kipapa.com" type="email" />
         </div>
         <div>
           <label htmlFor="description">Cidade</label>
           <input id="description" placeholder="Entre com a descrição" />
         </div>
         <div>
           <label htmlFor="description">Bairro</label>
           <input id="description" placeholder="Entre com a descrição" />
         </div>
         <div>
           <label htmlFor="description">Cep</label>
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