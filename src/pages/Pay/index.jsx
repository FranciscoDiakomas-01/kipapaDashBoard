/* eslint-disable no-unused-vars */
import Loader from "../../components/Loader";
import { getAllPayForm , deletePayForm , createPayForm, getPayFormById, updatePayForm} from "../../services/pay";
import { useState, useEffect } from "react";
import './index.css'
import { toast } from "react-toastify";
export default function Pay() {

  const [title, setTile] = useState("");
  const [reload, setReload] = useState(false);
  const[pay,setPay] = useState([1])
  const [isloading, setIsLoading] = useState(true);
  const [add , setAdd] = useState(false)
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    async function get() {
    const response = await getAllPayForm();
    setPay((prev) => response?.data);
  }
  get();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [reload]);
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
          <form
            onReset={(e) => {
              e.preventDefault();
              setTile((prev) => "");
            }}
            onSubmit={async (e) => {
              e.preventDefault();
              if (title?.length < 2) {
                return toast.warn("Deve conter mais que 2 caracteres");
              } else {
                const pay = {
                  title: title,
                };
                const response = await createPayForm(pay);
                if (response) {
                  setReload((prev) => !prev);
                  setTile(() => {
                    setAdd(false);
                  }, 1500);
                  return toast.success("Criado com sucesso");
                } else {
                  return toast.warn("Deve conter mais que 2 caracteres");
                }
              }
            }}
          >
            <h1>Cadastro de Forma de Pagamento</h1>
            <label>Título</label>
            <input
              placeholder="Entre com o nome"
              onChange={(e) => {
                setTile(e.target.value);
              }}
            />
            <div>
              <button>Cadatrar</button>
              <button
                type="reset"
                onClick={() => {
                  setAdd(() => false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </aside>
      )}
      {update && (
        <aside>
          <form
            onReset={(e) => {
              e.preventDefault();
              setTile((prev) => "");
            }}
            onSubmit={async (e) => {
              e.preventDefault();
              if (title?.length < 2) {
                return toast.warn("Deve conter mais que 2 caracteres");
              } else {
                const pay = {
                  title: title,
                };
                const response = await updatePayForm(pay, sessionStorage.getItem("pid"));
                if (response) {
                  setReload((prev) => !prev);
                  setTile(() => {
                    setUpdate(false);
                  }, 1500);
                  return toast.success("Actualizado com sucesso");
                } else {
                  return toast.warn("Deve conter mais que 2 caracteres");
                }
              }
            }}
          >
            <h1>Atualização da Forma de Pagamento</h1>
            <label>Título</label>
            <input
              placeholder="Entre com o nome"
              onChange={(e) => {
                setTile(e.target.value);
              }}
              value={title}
            />
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
      {Array.isArray(pay) && pay?.length > 0 ? (
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
                  {pay.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.id}</td>

                      <td>{item?.title}</td>
                      <td>
                        <button
                          onClick={async () => {
                            const response = await getPayFormById(item?.id);
                            sessionStorage.setItem("pid", item?.id)
                            setTile(response?.title);
                            setUpdate(() => true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={async () => {
                            await deletePayForm(item?.id);
                            toast.success("Deletado com sucesso!");
                            setReload((prev) => !prev);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <h1>Nehuma Forma de Pagamento cadatrado</h1>
      )}
    </section>
  );
}
