//import { useEffect, useState } from 'react';
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Title } from "@/styles/Pages/Home";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import PrismicDOM from 'prismic-dom';
import { Document } from "prismic-javascript/types/documents";

interface IHomeProps {
  recommendedProducts: Document[];
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

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <div>
      <SEO
        title="DevCommerce, you best choice in the internet"
        image="olivia.jpeg"
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

// SERVER SIDE RENDERING
// vai buscar algum tipo de dado e vai retornar para o componente através de propriedades
// então eu posso acessar qualquer coisa que é retornado dessa função nas minhas props
export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  // esse client() é o que criei no prismic
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"), // vai me retornar todos os docs lá do prismic onde o tipo for igual a produto
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};

// não devo usar o getServerSideProps para toda ocasião! só vou utilizar quando eu precisar uma informação que é dinãmica ("listagem api")
// que precisa estar disponível e indexadas para os motores de busca!
// pq se eu ficar utilizando o getServerSideProps para qualquer coisa a tela toda pode demorar para aparecer,
// o que chamamos de TTFB (time to first bite) que se demorar não é uma exp boa para o usuário

// TTFB com o client side fetching é muito menor, para o usuário é bom, mas para o motor de busca não
