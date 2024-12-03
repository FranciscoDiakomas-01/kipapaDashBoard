/* eslint-disable no-unused-vars */
import "./index.css";
import Loader from "../../components/Loader";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import CategoryForm from "../../components/CategoryForm";
import CategoryFormUpdate from "../../components/CategoryFormUpdate";
import { deleteById, getAll } from "../../services/CategoryProduct";
import { toast } from "react-toastify";
export default function Category() {
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setUpate] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  const [category, setCategory] = useState([2]);
  useEffect(() => {
    setIsLoading((prev) => true);
    async function getALL() {
      const response = await getAll(page, 6);
      setCategory(response?.data);
      setPagination((prev) => ({
        ...prev,
        lastPage: response?.latPage,
        currentPage: response?.page,
      }));
    }
    getALL();
    setTimeout(async () => {
      setIsLoading(false);
    }, 2000);
  }, [page, reload]);

  return (
    <section id="category">
      {isAdd && <CategoryForm close={setIsAdd} reload={setReload} />}
      {isUpdate && <CategoryFormUpdate close={setUpate} reload={setReload} />}
      <span>
        <h1>Categorias</h1>
        <button
          onClick={() => {
            setIsAdd(true);
          }}
        >
          + Add
        </button>
      </span>

      <article>
        <div>
          {Array.isArray(category) && category?.length > 0 ? (
            <>
              {isloading ? (
                <Loader />
              ) : (
                <>
                  <aside>
                    {category.map((item, index) => (
                      <figure key={index}>
                        <span>
                          <div>
                            <img src={item.img_url} />
                            <strong>{item?.title}</strong>
                          </div>
                          <p>{item.description}</p>
                        </span>
                        <div>
                          <button
                            onClick={() => {
                              sessionStorage.setItem("cid", item.id);
                              setUpate(true);
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={async () => {
                              const response = await deleteById(item.id);
                              if (response) {
                                toast.success("Deletado Com Sucesso!");
                                setReload((prev) => !prev);
                                return;
                              } else {
                                toast.error("Erro ao Deletar!");
                                setReload((prev) => !prev);
                                return;
                              }
                            }}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </figure>
                    ))}
                  </aside>
                  <span>
                    <p>
                      {pagination.currentPage} de{" "}
                      {pagination.lastPage == 0
                        ? pagination.lastPage + 1
                        : pagination.lastPage}
                    </p>
                    <div>
                      <button
                        onClick={() => {
                          if (page <= 1) {
                            return;
                          } else {
                            setPage((prev) => prev - 1);
                            setReload((prev) => !prev);
                            return;
                          }
                        }}
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => {
                          if (
                            pagination?.lastPage == page ||
                            pagination?.lastPage == 0
                          ) {
                            return;
                          } else {
                            setPage((prev) => prev + 1);
                            setReload((prev) => !prev);
                            return;
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </span>
                </>
              )}
            </>
          ) : (
            <h1>Nenhuma Categoria Cadastrada</h1>
          )}
        </div>
      </article>
    </section>
  );
}
