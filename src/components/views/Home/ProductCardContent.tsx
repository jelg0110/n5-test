import styles from './Home.module.scss';
import { Product } from '../../../types/Product';

interface ProductCardContentType {
  product: Product
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

function ProductCardContent({ product, onClick }: ProductCardContentType) {
 
  return (
    <div className={styles.CardContent}>
      <span className={styles.CardContent__description}>Precio: {product.price} $</span>
      <span>Cantidad disponible: {product.amount || 0}</span>
      <button className='Button' onClick={onClick}>Agregar</button>
    </div>
  );
}

export default ProductCardContent;
