import { useRouter } from 'next/router'
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(() => 
  import('../../../components/AddToCartModal'),
  {
    loading: () => <p>Loading...</p>, //lazy loading component
    ssr: false // faz com que o componente nunca seja renderizado pelo lado do servidor e sempre pelo lado do browser
  }
) 

export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false)

  function handleAddToCart() {
    setIsAddToCartModalVisible(true)
  }
  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { isAddToCartModalVisible && <AddToCartModal />}
    </div>
  )
}