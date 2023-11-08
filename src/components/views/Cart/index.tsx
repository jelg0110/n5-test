import { useEffect } from 'react';
import styles from './Cart.module.scss';
import { Link, useNavigate } from "react-router-dom";
import Card from '../../common/Card';
import List from '../../common/List';
import useCartProducts from '../../../hooks/useCartProducts';
import { Product } from '../../../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, stateProducts } from '../../../store/reducers/productReducer';

function CartComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(stateProducts);
  const { cartProducts, setCartProducts, handleAmountChange } = useCartProducts();
  const total = cartProducts.reduce((sum, value) => sum + (value.price * value.requestedAmount), 0);

  useEffect(() => {
    if (cartProducts.length === 0 || products.length === 0) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [cartProducts, products])

  const handleProductDelete = (product: Product) => {
    if (window.confirm("¿Está seguro que desea eliminar este producto de sus compras?")) {
      handleAmountChange(product)(0)
    }
  }

  const handleAllProductDelete = () => {
    if (window.confirm("¿Está seguro que desea eliminar todos los productos de sus compras?")) {
      setCartProducts([]);
    }
  }

  const handlePurchase = () => {
    const newProducts = products.map(item => {
      const cartProduct = cartProducts.find(p => p.id === item.id);
      if (cartProduct) {
        return {
          ...item,
          amount: item.amount - cartProduct.requestedAmount,
        }
      }
      return item;
    });
    dispatch(setProducts(newProducts));
    setCartProducts([]);
    navigate('/');
  }

  return (
    <div className={styles.Cart}>
      <div className={styles.Cart__header}>
        <div>
          <Link className='Button Button__outlined' to="/">
            Atras
          </Link>
          <h2>Mis Compras</h2>
        </div>
        <button className='Button' onClick={handlePurchase}>Comprar</button>
      </div>
      <Card>
        <List
          items={cartProducts}
          content={item => <div className={styles.Cart__listitem}>
            <div className={styles.Cart__listitem__text_container}>
              <span>{item.name}</span>
              <span>Precio: {item.price}$</span>
              <span>Cantidad: {item.requestedAmount}</span>
              <span>Total: {item.price * item.requestedAmount}$</span>
            </div>
            <button
              className='Button Button__icon Button__icon__trash Button--error'
              onClick={() => handleProductDelete(item)}
            >
              <i className="trash-icon"></i>
            </button>
          </div>}
        />
        <div className={styles.Cart__total_container}>
          <h4>Total: <strong>{total}$</strong></h4>
          <button
            className='Button Button__icon Button__icon__trash Button--error'
            onClick={() => handleAllProductDelete()}
          >
            <i className="trash-icon"></i>
          </button>
        </div>
      </Card>
    </div>
  );
}

export default CartComponent;