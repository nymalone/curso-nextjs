import { useEffect, useState } from 'react';
import { Title } from '../styles/Pages/Home';

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch('http://localhost:3334/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data)
      })
    })
  }, []);
  
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
