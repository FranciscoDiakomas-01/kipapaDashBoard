import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import './index.css'
export default function Pay() {
  const demo = [
    {
      id: 1,
      name: "PayPal",
    },
    {
      id: 1,
      name: "Cartão de Crédito",
    },
    {
      id: 1,
      name: "Cartão de Débito",
    },
    {
      id: 1,
      name: "Pix",
    },
  ];
  const [isloading, setIsLoading] = useState(true);
  const [add , setAdd] = useState(false)
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <section id="user" className="pay">
      <div>
        <h1>Formas de Pagamento</h1>
        <button
          onClick={() => {
            setAdd(() => true);
          }}
        >
          + Add
        </button>
      </div>
      {add && (
        <aside>
          <form>
            <h1>Cadastro de Forma de Pagamento</h1>
            <label>Título</label>
            <input placeholder="Entre com o nome" />
            <div>
              <button>Cadatrar</button>
              <button
                type="button"
                onClick={() => {
                  setAdd(() => false);
                }}
              >
                Fechar
              </button>
            </div>
          </form>
        </aside>
      )}
      {update && (
        <aside>
          <form>
            <h1>Atualização da Forma de Pagamento</h1>
            <label>Título</label>
            <input placeholder="Entre com o nome" />
            <div>
              <button>Cadatrar</button>
              <button
                type="button"
                onClick={() => {
                  setUpdate(() => false);
                }}
              >
                Fechar
              </button>
            </div>
          </form>
        </aside>
      )}
      {Array.isArray(demo) && demo?.length > 0 ? (
        <>
          {isloading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>opções</td>
                  </tr>
                </thead>

                <tbody>
                  {demo.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>

                      <td>{item.name}</td>
                      <td>
                        <button onClick={()=>{
                            setUpdate(()=>true)
                        }} >Editar</button>
                        <button>Eliminar</button>
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
            </>
          )}
        </>
      ) : (
        <h1>Nehuma Forma de Pagamento cadatrado</h1>
      )}
    </section>
  );
}
