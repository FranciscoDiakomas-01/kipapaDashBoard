
/* eslint-disable react/prop-types */
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { toast } from 'react-toastify';
import {createProduct } from '../../services/Product'
export default function ProductForm({ close, reload, category }) {
  const nav = useNavigate()
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setcategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(0);
  useEffect(() => {
    if (!Array.isArray(category) && !category?.length > 0) {
      setTimeout(() => {
        nav("/category")
      },2000)
    }
  })
async function CreatePost(e) {
  e.preventDefault();
  if (file && name?.length > 0 && description?.length > 0 && !isNaN(price) && !isNaN(categoryId)) {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("categoryId", categoryId);
    formdata.append("olprice", 0);
    const response = await createProduct(formdata);
    if (response) {
      toast.success("Criado com sucesso!");
      close(false);
      reload((prev) => !prev);
      return;
    } else {
      toast.error("Erro ao criar!");
      return;
    }
  } else {
    toast.error("Preencha todos os Campos!");
    console.log(name, file, description);
    return;
  }
}
 return (
   <section id="productForm">
     {Array.isArray(category) && category?.length > 0 ? (
       <form onSubmit={CreatePost}>
         <span id="profile">
           <img src={file && URL.createObjectURL(file)} />
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
             <label htmlFor="price">Preço</label>
             <input
               id="price"
               placeholder="Entre com o preço"
               type="number"
               onChange={(e) => {
                 setPrice(e.target.value);
               }}
             />
           </div>
           <div>
             <label htmlFor="category">Categoria</label>
             <select
               id="category"
               onChange={(e) => {
                 setcategoryId(e.target.value);
               }}
             >
               <option value="aa">Selecione uma categoria</option>
               {Array.isArray(category) &&
                 category?.map((c) => (
                   <option key={c?.id} value={c?.id}>
                     {c?.title}
                   </option>
                 ))}
             </select>
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
     ) : (
       <h1 style={{color : 'var(--pink)' , fontSize : '22pt'}}>Nenhuma Categoria Cadastrada</h1>
     )}
   </section>
 );
}