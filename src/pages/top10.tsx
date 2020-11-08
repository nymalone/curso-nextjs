import { GetStaticProps } from "next"

interface IProduct {
  id: string;
  title: string;
}

interface ITop10Props { 
  products: IProduct[];
}

export default function Top10({products}: ITop10Props) {
  return (
    <div>
      <h1>Top 10</h1>
      <ul>
          {products.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
    </div>
  )
}

// STATIC SITE GENERATION -> utilizado para páginas que não precisam de ter o conteúdo sempre atualizado (ex: blog);
export const getStaticProps: GetStaticProps<ITop10Props> = async (context) => {
  const response = await fetch('http://localhost:3334/products')
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 5 // a cada 5s o next precisa gerar uma naova versão dessa pág para mim atualizada
  }
}