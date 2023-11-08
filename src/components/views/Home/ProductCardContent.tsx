import { useState } from 'react';
import styles from './Home.module.scss';
import { Product, CartProduct } from '../../../types/Product';

interface ProductCardContentType {
  product: Product | CartProduct
  onAmountChange: (value: number) => void,
}

function ProductCardContent({ product, onAmountChange }: ProductCardContentType) {
  const requestedAmount = 'requestedAmount' in product ? product.requestedAmount : 0;
  const [showAmount, setShowAmount] = useState(false);
  const [value, setValue] = useState(requestedAmount.toString());
  const isExpendedAmount = (product.amount - requestedAmount) === 0;

  const handleAdd = () => {
    if (isExpendedAmount) {
      setValue('0');
      onAmountChange(0);
    } else {
      setShowAmount(true);
    }
  }

  const handleCancel = () => {
    setShowAmount(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleProductDelete = () => {
    if (window.confirm("¿Está seguro que desea eliminar este producto de sus compras?")) {
      onAmountChange(0);
      setShowAmount(false);
    }
  }

  const handleSubmit = () => {
    const amount = +value;
    if (amount > 0 && amount <= product.amount) {
      onAmountChange(amount);
      setShowAmount(false);
    }
  }

  return (
    <div className={styles.CardContent}>
      <span className={styles.CardContent__description}>Precio: {product.price} $</span>
      <div className={styles.CardContent__amountContainer}>
        <span>Cantidad disponible: {product.amount || 0}</span>
        {
          !!requestedAmount && <span className={styles.CardContent__requestedAmount}>- {requestedAmount}</span>
        }
      </div>
      {
        !showAmount
          ? <button
            className={`Button ${isExpendedAmount ? 'Button--error' : ''}`}
            onClick={handleAdd}
            disabled={product.amount === 0}
          >
            {product.amount === 0 ? 'Sin inventario' : isExpendedAmount ? 'Quitar' : 'Agregar'}
          </button>
          : <div className={styles.CardContent__amount_input}>
            <button className='Button Button__icon Button--error' onClick={handleCancel}>
              <i className="close-icon"></i>
            </button>
            <input
              type="number"
              value={value}
              min={1}
              max={product.amount}
              required
              onChange={handleInputChange}
            />
            {
              !!requestedAmount && <button
                className='Button Button__icon Button__icon__trash Button--error'
                onClick={handleProductDelete}
              >
                <i className="trash-icon"></i>
              </button>
            }
            <button className='Button Button__icon Button--success' onClick={handleSubmit}>
              <i className="check-icon"></i>
            </button>
          </div>
      }
    </div>
  );
}

export default ProductCardContent;
