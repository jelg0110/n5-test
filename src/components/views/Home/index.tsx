import { useState, MouseEvent, useEffect } from 'react';
import styles from './Home.module.scss';
import ProductCardContent from './ProductCardContent';
import Card from '../../common/Card';
import Loader from '../../common/Loader';
import { getProducts } from '../../../services/ProductService';
import { getError } from '../../../services/utils';
import { Product } from '../../../types/Product';

function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<null | Error | Response>(null);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(response => {
        setProducts(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setProducts([]);
      })
  }


  const handleCardClick = (prod: Product) => (event: MouseEvent<HTMLButtonElement>) => {
  }

  const Content = products.length > 0
    ? <div className={styles.Product__card_container}>
      {
        products.map((prod, index) => <div
          key={index}
          className={styles.Product__card_item}
        >
          <Card title={prod.name}>
            <ProductCardContent product={prod} onClick={handleCardClick(prod)} />
          </Card>
        </div>)
      }
    </div>
    : <div className={styles.Product__container}>
      <h1 className={error ? styles.Product__container__error : undefined}>
        {error ? getError(error) : 'Ha ocurrido un error inesperado'}
      </h1>
    </div>

  return (
    <div className={styles.Product}>
      {
        loading
          ? <div className={styles.Product__container}>
            <Loader />
          </div>
          : Content
      }
    </div>
  );
}

export default HomeComponent;