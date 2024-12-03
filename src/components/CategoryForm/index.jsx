/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import { create } from '../../services/CategoryProduct';
import './index.css'
import { useState } from 'react';
export default function CategoryForm({ close , reload }) {
  const [file, setFile] = useState("")
  const [name , setName] = useState("")
  const [description, setDescription] = useState("");

  async function CreatePost(e) {
    e.preventDefault()
    if (file && name?.length > 0 && description?.length > 0) {
      
      const body = {
        title: name,
        file: file,
        desription: description,
      };
      const response = await create(body);
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
      console.log(name,file,description)
      return 
    }
    
  }
 return (
   <section id="FormCategory">
     <form encType="multipart/form-data" method="post" onSubmit={CreatePost}>
       <article>
         <div>
           <label htmlFor="name">Nome</label>
           <input
             id="name"
             placeholder="Entre com o nome"
             onChange={(e) => {
               setName(e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="description">Descrição</label>
           <input
             id="description"
             placeholder="Entre com a descrição"
             onChange={(e) => {
               setDescription(e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="name">Link da Imagem</label>
           <input
             id="name"
             placeholder="Entre com o nome"
             onChange={(e) => {
               setFile(e.target.value);
             }}
           />
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