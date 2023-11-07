import { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import ProductCardContent from './ProductCardContent';
import Card from '../../common/Card';
import Loader from '../../common/Loader';
import { getProducts } from '../../../services/ProductService';
import { getError, getLocalStorage, setLocalStorage } from '../../../services/utils';
import { Product } from '../../../types/Product';

function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartProducts, setLocalCartProducts] = useState<Product[]>(getLocalStorage('cartProducts') || []);
  const [error, setError] = useState<null | Error | Response>(null);
  const setCartProducts = (data: Product[]) => {
    setLocalStorage('cartProducts', data);
    setLocalCartProducts(data);
  };

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


  const handleAmountChange = (prod: Product) => (value: number) => {
    if (value === 0) {
      const products = cartProducts.filter(item => item.id !== prod.id)
      setCartProducts(products);
      return;
    }

    // If product is alredy in cart, update it
    if (cartProducts.find(item => item.id === prod.id)) {
      const products = cartProducts.map((item: Product) => {
        if (item.id === prod.id) {
          return {
            ...item,
            requestedAmount: value,
          };
        }
        return item
      });
      setCartProducts(products);
      // If not, add it
    } else {
      const products = cartProducts.concat({
        ...prod,
        requestedAmount: value,
      })
      setCartProducts(products);
    }
  }

  const getProduct = (product: Product) => {
    const cartProduct = cartProducts.find(item => item.id === product.id);
    if (cartProduct) {
      return cartProduct;
    }
    return product
  }

  const Content = products.length > 0
    ? <div className={styles.Product__card_container}>
      <h2>Lista de Productos:</h2>
      {
        products.map((prod, index) => <div
          key={index}
          className={styles.Product__card_item}
        >
          <Card title={prod.name}>
            <ProductCardContent product={getProduct(prod)} onAmountChange={handleAmountChange(prod)} />
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