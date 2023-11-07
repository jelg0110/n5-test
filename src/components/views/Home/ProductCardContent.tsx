import { useState } from 'react';
import styles from './Home.module.scss';
import { Product } from '../../../types/Product';

interface ProductCardContentType {
  product: Product
  onAmountChange: (value: number) => void,
}

function ProductCardContent({ product, onAmountChange }: ProductCardContentType) {
  const [showAmount, setShowAmount] = useState(false);
  const [value, setValue] = useState(product.requestedAmount?.toString() || '0');
  const isExpendedAmount = product.amount - (product.requestedAmount || 0) === 0;

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
          !!product.requestedAmount && <span className={styles.CardContent__requestedAmount}>- {product.requestedAmount}</span>
        }
      </div>
      {
        !showAmount
          ? <button
            className={`Button ${isExpendedAmount ? 'Button--error' : ''}`}
            onClick={handleAdd}
          >
            {isExpendedAmount ? 'Quitar' : 'Agregar'}
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
              !!product.requestedAmount && <button
                className='Button Button__icon Button__icon__trash Button--error'
                onClick={() => onAmountChange(0)}
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
