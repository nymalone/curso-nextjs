//import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Title } from '../styles/Pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({ recommendedProducts }: IHomeProps) {
 // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // CLIENT SIDE FETCHING -> uso quando eu não preciso que esteja nos motores de busca, infos que eu não preciso indexar; só vai ser disparada no browser
  // useEffect(() => {
  //   fetch('http://localhost:3334/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data)
  //     })
  //   })
  // }, []);
  
  return (
   <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>
   </div>
  )
}

// SERVER SIDE RENDERING 
// vai buscar algum tipo de dado e vai retornar para o componente através de propriedades 
// então eu posso acessar qualquer coisa que é retornado dessa função nas minhas props 
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
     const response = await fetch('http://localhost:3334/recommended')
     const recommendedProducts = await response.json();

     return {
      props: {
        recommendedProducts
      }
     }
}
