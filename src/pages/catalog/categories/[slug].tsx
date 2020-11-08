import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'


interface IProduct {
  id: string;
  title: string;
}

interface ICategoryProps { 
  products: IProduct[];
}

export default function Category({ products }: ICategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`http://localhost:3334/categories`)
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id}
    }
  })

  return {
    paths, // preciso falar quais são as categorias que tenho na minha aplicação 
    fallback: true, // sempre que eu tentar acessar uma pag que ainda nao foi gerado no build, ele vai tentar gerar automaticamente
  }
}

// STATIC SITE GENERATION DINAMIC
export const getStaticProps: GetStaticProps<ICategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`http://localhost:3334/products?category_id=${slug}`)
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60 
  }
}