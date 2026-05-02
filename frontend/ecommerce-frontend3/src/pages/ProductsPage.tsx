import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Product, Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { FilterBar } from '../components/FilterBar';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    api.get('/categories').then(r => setCategories(r.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params: any = {};
    if (search) params.search = search;
    if (selectedCategory) params.categoryId = selectedCategory;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    const timer = setTimeout(() => {
      api.get('/products', { params })
        .then(r => setProducts(r.data))
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [search, selectedCategory, minPrice, maxPrice]);

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Məhsullar</h1>
        <p>{products.length} məhsul tapıldı</p>
      </div>

      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        search={search}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onCategory={setSelectedCategory}
        onSearch={setSearch}
        onMinPrice={setMinPrice}
        onMaxPrice={setMaxPrice}
      />

      {loading ? (
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">😕 Məhsul tapılmadı</div>
      ) : (
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};