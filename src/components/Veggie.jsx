//rfce ES7
//importo hooks de React
//useState para poder utilizar estados.
import { useEffect, useState } from "react";

import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Link} from "react-router-dom"; 

function Veggie() {
  //declaro estado con conts.
  //"veggie" parametro que contiene el valor del estado.
  //"setVeggie" funcion que se encarga de actualizar el estado.
  //"useState([])" inicializa el valor, en este caso array vacio pero puede ser cualquier cosa.
  const [veggie, setVeggie] = useState([]);

  //una vez que se carga todo el componente, se ejecuta el useEffect 
  //o que cambie algun estado
  //siempre se debe usar con una funcion flecha
  //importante el ",[]" para que no se haga un bucle infinito
  useEffect(() => {
    getVeggie();
  }, [])
  
  //declaro funcion asincrona ( async ) para permitir que se ejecuten otras tareas
  //mientras carga la misma.
  const getVeggie = async () => {
    // verifica si se encuentra en el localStorage 
    const check = localStorage.getItem('veggie');
    // para evitar hacer el fetch en cada actualizacion de la pagina 
    if (check){
      setVeggie(JSON.parse(check));
    }else{
      //esperamos la respuesta de una función(solo se puede usar dentro de async)
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tag=vegetarian`
      ); 
      //el texto plano se pasa a formato json y se almacena en data
      const data = await api.json();
      localStorage.setItem('veggie',JSON.stringify(data.recipes));
      setVeggie(data.recipes)
      console.log(data.recipes)
    }
};
  return (
    <div>
      <Wrapper>
        <h3>Recetas vegetarianas</h3>
        <Splide
          options={{
            perPage: 3,
            arrow: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}>
          {veggie.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

// styled components 
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position :relative;
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Veggie