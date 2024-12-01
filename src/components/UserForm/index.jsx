/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createUser } from '../../services/User';
import { useState } from 'react';
import { toast } from 'react-toastify';
export default function UserForm({ close , reload , category}) {
  const [name ,setName] = useState("")
  const [lastname, setLastname] = useState("");
  const [categpryId, setCategoryId] = useState("all");
  const [cep, setCep] = useState("");
  const [qoute, setQuoute] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  async function create(e) {
    e.preventDefault()

    //validations

    if (name?.length < 2 || lastname?.length < 2 | isNaN(categpryId) || !cep || cep?.length < 12 || !qoute || !email || !city) {
      return toast.warn("Dados invalidos!")
    } else {
      const body = {
        city: city,
        cep: cep,
        qoute: qoute,
        email: email,
        name: name,
        lastname: lastname,
        password: "1234567890",
        categoryId: categpryId,
      };
      const response = await createUser(body)
      if (response) {
        toast.success("Criado com sucesso!")
        reload(prev => !prev)
        return
      } else {
        toast.error("Erro ao criar!")
        return
      }
    }

  }
 return (
   <section id="FormProduct">
     <form onSubmit={create}>
       <article>
         <div>
           <label htmlFor="name">Nome</label>
           <input
             id="name"
             placeholder="Entre com o nome"
             onChange={(e) => {
               setName((prev) => e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="lastname">Sobre nome</label>
           <input
             id="lastname"
             placeholder="Entre com o sobre nome"
             onChange={(e) => {
               setLastname((prev) => e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="category">Categoria</label>
           <select
             id="category"
             onChange={(e) => {
               setCategoryId((prev) => e.target.value);
             }}
           >
             <option>Selecione uma categoria</option>
             {Array.isArray(category) &&
               category?.map((c) => (
                 <option key={c?.id} value={c?.id}>
                   {c?.title}
                 </option>
               ))}
           </select>
         </div>
         <div>
           <label htmlFor="email">Email</label>
           <input
             id="email"
             placeholder="exemplo@kipapa.com"
             type="email"
             onChange={(e) => {
               setEmail((prev) => e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="description">Cidade</label>
           <input
             id="description"
             placeholder="Entre com a cidade"
             onChange={(e) => {
               setCity((prev) => e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="description">Bairro</label>
           <input
             id="description"
             placeholder="Entre com o bairro"
             onChange={(e) => {
               setQuoute((prev) => e.target.value);
             }}
           />
         </div>
         <div>
           <label htmlFor="description">Cep</label>
           <input
             id="description"
             placeholder="Entre com o cep"
             onChange={(e) => {
               setCep((prev) => e.target.value);
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