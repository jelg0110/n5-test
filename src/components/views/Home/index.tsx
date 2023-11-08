import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import ProductCardContent from './ProductCardContent';
import Card from '../../common/Card';
import Loader from '../../common/Loader';
import { getProducts } from '../../../services/ProductService';
import { getError } from '../../../services/utils';
import useCartProducts from '../../../hooks/useCartProducts';
import { setProducts, stateProducts } from '../../../store/reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';

function HomeComponent() {
  const dispatch = useDispatch();
  const products = useSelector(stateProducts);
  const { getProduct, handleAmountChange } = useCartProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error | Response>(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
    // eslint-disable-next-line
  }, [])

  const fetchProducts = () => {
    setLoading(true);
    getProducts()
      .then(response => {
        dispatch(setProducts(response));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        dispatch(setProducts([]));
      })
  }

  const Content = products.length > 0
    ? <div className={styles.Product__card_container}>
      <div className={styles.Product__card_container__header}>
        <h2>Lista de Productos</h2>
        <div>
          <button className='Button Button__outlined Button__icon'>
            <i className="add-icon"></i>
          </button>
          <Link className='Button Button__icon' to="/cart">
            <i className="cart-icon"></i>
          </Link>
        </div>
      </div>
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
        {error ? getError(error) : 'No se encontraron productos'}
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