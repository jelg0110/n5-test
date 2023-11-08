import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Product } from "../../../types/Product";
import { getRandomInteger } from '../../../services/utils';

interface NewProductType {
  open: boolean
  onSubmit: (product: Product) => void,
}

const defaultValue: Product = {
  name: '',
  price: 0,
  amount: 0,
  id: 0,
}

function NewProduct({ open, onSubmit }: NewProductType) {
  const [product, setProduct] = useState(defaultValue);

  useEffect(() => {
    setProduct(defaultValue);
    // eslint-disable-next-line
  }, [open])

  const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({
      ...prev,
      [key]: event.target.value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProduct = { ...product, id: getRandomInteger(11, 1000) };
    onSubmit(newProduct);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.ProductForm}>
      <label>
        Nombre:
        <input type="text" value={product.name} onChange={handleChange('name')} required />
      </label>
      <label>
        Precio:
        <input type="number" value={product.price} onChange={handleChange('price')} required min={1} />
      </label>
      <label>
        Cantidad:
        <input type="number" value={product.amount} onChange={handleChange('amount')} required min={1} />
      </label>
      <button type='submit' className='Button'>
        Guardar
      </button>
    </form>
  )
}

export default NewProduct;