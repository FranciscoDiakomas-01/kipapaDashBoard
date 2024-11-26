import Loader from '../../components/Loader';
import { useState, useEffect } from "react";
export default function Clients() {
    const demo = [
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
        salary : 120000
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
      {
        id: 1,
        name: "Francisco",
        lastName: "Diakomas",
        email: "fran@gmail.com",
      },
    ];
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
 return (
   <section id="user">
     <div>
       <h1>Clientes</h1>
     </div>
     {Array.isArray(demo) && demo?.length > 0 ? (
       <>
         {isloading ? (
           <div>
             <Loader />
           </div>
         ) : (
           <>
             <article>
               {demo.map((item, index) => (
                 <figure key={index}>
                   <span
                     style={{
                       backgroundColor: "var(--pink)",
                     }}
                   >
                     {item.name.at(0) + item.lastName.at(0)}
                   </span>
                   <strong>{item.name + " " + item.lastName}</strong>
                   <i>{item.email}</i>
                     <button>Eliminar</button>
                 </figure>
               ))}
             </article>
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
       <h1>Nehum Cliente cadatrado</h1>
     )}
   </section>
 );
}