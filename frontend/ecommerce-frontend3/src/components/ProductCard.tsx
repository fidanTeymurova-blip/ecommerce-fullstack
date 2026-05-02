import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Props { product: Product; }

export const ProductCard = ({ product }: Props) => {
  const { addToCart, items } = useCart();
  const inCart = items.find(i => i.product.id === product.id);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl || 'https://placehold.co/300x300?text=Məhsul'} alt={product.name} />
        {product.stock === 0 && <div className="out-of-stock">Stokda yoxdur</div>}
      </div>
      <div className="product-info">
        <span className="product-category">{product.categoryName}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price} ₼</span>
          <button
            className={`btn-add ${inCart ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {inCart ? `✓ Səbətdə (${inCart.quantity})` : '+ Səbətə əlavə et'}
          </button>
        </div>
      </div>
    </div>
  );
};