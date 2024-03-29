//rfce ES7
//Hooks
import { useEffect, useState } from "react";
//Estilo componentes
import styled from "styled-components";
//Tarjetas
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
//Navegacion
import {Link} from 'react-router-dom';

function Popular() {
  
  const [popular, setPopular] = useState([]); 
  
  useEffect(() => {
    getPopular();
  }, [])    
  
  const getPopular = async () => {
    // verifica si se encuentra en el localStorage 
    const check = localStorage.getItem('popular');
    // para evitar hacer el fetch en cada actualizacion de la pagina 
    if (check){
      setPopular(JSON.parse(check));
    }else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
      ); 
      const data = await api.json();
      localStorage.setItem('popular',JSON.stringify(data.recipes));
      setPopular(data.recipes)
      console.log(data.recipes)
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>Recetas populares</h3>
        <Splide
          options={{
            perPage: 4,
            arrow: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}>
          {popular.map((recipe) => {
            return(
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
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

export default Popular