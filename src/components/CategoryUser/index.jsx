/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './index.css'
import { FaArrowLeft, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAllUsercategory ,createCategoryUser ,deleteUserCategoryById , getByIdCategoryUserById, updateCategoryUser } from '../../services/CategoryUSer';
import { toast } from 'react-toastify';
import Loader from '../Loader';
export default function CategoryUser({ close , reloadOnReturn }) {
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("")
  const [salary, setSalary] = useState(0)
  const [categodys, setCategory] = useState([1])
  const [reload, setReload] = useState(false)
  const [isloading , setIsLoading] = useState(true)
  useEffect(() => {
    async function get() {
      const response = await getAllUsercategory();
      setCategory((prev) => response?.data);
    }
    get();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [reload]);
  async function create(e) {
    e.preventDefault()
    if (name?.length < 2) {
      toast.warn("Nome deve conter masi de 2 caracteres")
      return
    }else if (isNaN(salary) || salary < 10000) {
      toast.warn("Salário deve ser no mínimo 10.000kz");
      return;
    } else {
      //API
      const body = {
        salary: salary,
        title: name,
      };
      const response = await createCategoryUser(body)
      if (response) {
        toast.success("Criado com Sucesso!")
        return setTimeout(() => {
          setIsAdding(prev => false)
          setReload(prev => !prev)
        },1000)
      } else {
        toast.error("Erro ao criar!");
        return
      }
    }
    
  }

   async function update(e) {
     e.preventDefault();
     if (name?.length < 2) {
       toast.warn("Nome deve conter masi de 2 caracteres");
       return;
     } else if (isNaN(salary) || salary < 10000) {
       toast.warn("Salário deve ser no mínimo 10.000kz");
       return;
     } else {
       //API
       const body = {
         salary: salary,
         title: name,
       };
       const response = await updateCategoryUser(body);
       if (response) {
         toast.success("Actualizado com Sucesso!");
         return setTimeout(() => {
           setIsEditing((prev) => false);
           setReload((prev) => !prev);
         }, 1000);
       } else {
         toast.error("Erro ao actualizar!");
         return;
       }
     }
   }
  return (
    <section id="categoryUser">
      {isAdding && (
        <article>
          <form onSubmit={create}>
            <h1>Cadatro</h1>
            <aside>
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
                <label htmlFor="salary">Salário</label>
                <input
                  id="salary"
                  type="number"
                  placeholder="Entre com o salário"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </div>
            </aside>
            <div>
              <button>Criar</button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      )}
      {isEditing && (
        <article>
          <form onSubmit={update}>
            <h1>Actualização</h1>
            <aside>
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
                <label htmlFor="salary">Salário</label>
                <input
                  id="salary"
                  value={salary}
                  type="number"
                  placeholder="Entre com o salário"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </div>
            </aside>
            <div>
              <button>Actualizar</button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Fechar
              </button>
            </div>
          </form>
        </article>
      )}
      <div>
        <button
          onClick={() => {
            reloadOnReturn((prev) => !prev);
            close(false);
          }}
        >
          <FaArrowLeft />
          <p>Voltar</p>
        </button>
        <button
          onClick={() => {
            setIsAdding(true);
          }}
        >
          + Add
        </button>
      </div>
      {isloading ? (
        <Loader />
      ) : (
        <>
          {Array.isArray(categodys) && categodys?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Título</td>
                  <td>Salário</td>
                  <td>Açções</td>
                </tr>
              </thead>

              <tbody>
                {categodys.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item?.title}</td>
                    <td>{Number(item.salary).toLocaleString("pt")}kz</td>
                    <td>
                      <button
                        onClick={async () => {
                          sessionStorage.setItem("ucid" , item?.id);
                          const response = await getByIdCategoryUserById(
                            item?.id
                          );
                          setName((prev) => response?.title);
                          setSalary((prev) => response?.salary);
                          setIsEditing((prev) => true);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={async () => {
                          await deleteUserCategoryById(item?.id);
                          toast.success("Deletado Com Sucesso!");
                          setReload((prev) => !prev);
                        }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
                fontSize: "22pt",
                color: "var(--pink)",
              }}
            >
              Nenhuma categoria Cadastrada
            </h1>
          )}
        </>
      )}
    </section>
  );
}