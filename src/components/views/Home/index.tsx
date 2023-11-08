import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import ProductCardContent from './ProductCardContent';
import NewProduct from './NewProduct';
import Card from '../../common/Card';
import Loader from '../../common/Loader';
import Modal from '../../common/Modal';
import useCartProducts from '../../../hooks/useCartProducts';
import { getProducts } from '../../../services/ProductService';
import { getError } from '../../../services/utils';
import { setProducts, stateProducts } from '../../../store/reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../../types/Product';
import LogicTest from './LogicTest';

function HomeComponent() {
  const dispatch = useDispatch();
  const products = useSelector(stateProducts);
  const { getProduct, handleAmountChange } = useCartProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error | Response>(null);
  const [open, setOpen] = useState(false);
  const [openLogic, setOpenLogic] = useState(false);

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

  const handleSubmit = (product: Product) => {
    dispatch(setProducts(products.concat(product)));
    setOpen(false);
  }

  const Content = products.length > 0
    ? <div className={styles.Home__card_container}>
      <div className={styles.Home__card_container__header}>
        <h2>Lista de Productos</h2>
        <div>
          <button className='Button Button__outlined Button__icon' onClick={() => setOpenLogic(true)}>
            <i className="invert-icon"></i>
          </button>
          <button className='Button Button__outlined Button__icon' onClick={() => setOpen(true)}>
            <i className="add-icon"></i>
          </button>
          <Link className='Button Button__icon' to="/cart">
            <i className="cart-icon"></i>
          </Link>
        </div>
      </div>
      <Modal open={open} handleClose={() => setOpen(false)} title='Nuevo Producto'>
        <NewProduct open={open} onSubmit={handleSubmit} />
      </Modal>
      <Modal open={openLogic} handleClose={() => setOpenLogic(false)} title='Test de Lógica'>
        <LogicTest open={openLogic} />
      </Modal>
      {
        products.map((prod, index) => <div
          key={index}
          className={styles.Home__card_item}
        >
          <Card title={prod.name}>
            <ProductCardContent product={getProduct(prod)} onAmountChange={handleAmountChange(prod)} />
          </Card>
        </div>)
      }
    </div>
    : <div className={styles.Home__container}>
      <h1 className={error ? styles.Home__container__error : undefined}>
        {error ? getError(error) : 'No se encontraron productos'}
      </h1>
    </div>

  return (
    <div className={styles.Home}>
      {
        loading
          ? <div className={styles.Home__container}>
            <Loader />
          </div>
          : Content
      }
    </div>
  );
}

export default HomeComponent;