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
      const formdata = new FormData()
      formdata.append("file", file)
      formdata.append("title", name);
      formdata.append("desription", description);
      const response = await create(formdata)
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
       <span>
         <img
           src={file && URL.createObjectURL(file)}
         />
         <h1>Foto</h1>
         <input
           type="file"
           onChange={(e) => {
             setFile(e.target.files[0]);
           }}
         />
       </span>
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