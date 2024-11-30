
/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import { getById  ,  update} from '../../services/CategoryProduct';
import './index.css'
import { useState , useEffect } from 'react';
export default function CategoryFormUpdate({ close , reload }) {
  const [name , setName] = useState("")
  const [description, setDescription] = useState("");
  useEffect(() => {
    
    async function get() {
      const response = await getById(sessionStorage.getItem("cid"))
      setName(response?.title)
      setDescription(response?.description);
    }
    get()
  },[])
  async function UpdateCategory(e) {
    e.preventDefault()
    if (name?.length > 0 && description?.length > 0) {
      const body = {
        title: name,
        desription: description,
      };
      const response = await update(body);
      if (response) {
        toast.success("Criado com sucesso!")
        close(false)
        reload((prev)=> !prev)
        return
      } else {
        toast.error("Erro ao criar!");
        return;
      }
    } else {
      toast.error("Preencha todos os Campos!")
      return 
    }
    
  }
 return (
   <section id="productForm">
     <form encType="multipart/form-data" method="post" onSubmit={UpdateCategory}>
         <article>
           <div>
             <label htmlFor="name">Nome</label>
             <input
               id="name"
               value={name}
               placeholder="Entre com o nome"
               onChange={(e) => {
                 setName(e.target.value);
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
                 setDescription(e.target.value);
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
           cancelar
         </button>
       </div>
     </form>
   </section>
 );
}