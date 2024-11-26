/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './index.css'
import { FaArrowLeft, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { useEffect, useState } from 'react';
export default function CategoryUser({ close }) {
  const [isAdding , setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [categodys, setCategory] = useState([])
  useEffect(() => {
    setCategory([
      {
        id: 1,
        title: "BarMan",
        salary: 10000,
      },
      {
        id: 2,
        title: "Entregador",
        salary: 20000,
      },
    ]);
  },[])
  return (
    <section id="categoryUser">
      {isAdding && (
        <article>
          <form>
            <h1>{
              isEditing ? 'Cadastro' : 'Actualização'
            }</h1>
            <aside>
              <div>
                <label htmlFor="name">Nome</label>
                <input id="name" placeholder="Entre com o nome" />
              </div>
              <div>
                <label htmlFor="description">Descrição</label>
                <input id="description" placeholder="Entre com a descrição" />
              </div>
            </aside>
            <div>
              <button>Criar</button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing((prev) => false);
                  setIsAdding(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
      )}
      <div>
        <button
          onClick={() => {
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
              <td>{Number(item.salary).toLocaleString('pt')}kz</td>
              <td>
                <button onClick={() => {
                  setIsAdding(true)
                  setIsEditing(prev => false)
                }}>
                  <FaRegEdit />
                </button>
                <button>
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <span>
        <p>x de y</p>
        <div>
          <button>Prev</button>
          <button>Next</button>
        </div>
      </span>
    </section>
  );
}