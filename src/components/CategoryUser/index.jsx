/* eslint-disable react/prop-types */
import './index.css'
import { FaArrowLeft, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
export default function CategoryUser({ close }) {


  return (
    <section id="categoryUser">
      <div>
        <button
          onClick={() => {
            close(false);
          }}
        >
          <FaArrowLeft />
          <p>Voltar</p>
        </button>
        <button>+ Add</button>
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
          <tr>
            <td>1</td>
            <td>Cozinheiro</td>
            <td>10000</td>
            <td>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>BarMan</td>
            <td>20000</td>
            <td>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Entregador</td>
            <td>10000</td>
            <td>
              <button>
                <FaRegEdit />
              </button>
              <button>
                <FaRegTrashAlt />
              </button>
            </td>
          </tr>
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