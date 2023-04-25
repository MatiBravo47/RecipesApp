import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom"; 

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, [])
  
  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');
    if (check){
      setVeggie(JSON.parse(check));
    }else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tag=vegetarian`
      ); 
      const data = await api.json();
      localStorage.setItem('veggie',JSON.stringify(data.recipes));
      setVeggie(data.recipes)
      console.log(data.recipes)
    }
  };
  
  return (
    <div className="container py-5"> {/* contenedor principal */}
      <h3 className="text-center mb-5">Recetas vegetarianas</h3>
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
              <Link to={"/recipe/" + recipe.id} className="text-decoration-none"> {/* agregar clase de Bootstrap */}
                <div className="card position-relative mb-3">
                  <img src={recipe.image} alt={recipe.title} className="card-img-top" />
                  <div className="card-body p-3">
                    <h5 className="card-title mb-0">{recipe.title}</h5>
                  </div>
                  <div className="gradient position-absolute w-100 h-100"></div> {/* agregar clase de Bootstrap */}
                </div>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  )
}

export default Veggie


