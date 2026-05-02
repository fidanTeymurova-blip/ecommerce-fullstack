import type { Category } from '../types';

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  search: string;
  minPrice: string;
  maxPrice: string;
  onCategory: (id: number | null) => void;
  onSearch: (v: string) => void;
  onMinPrice: (v: string) => void;
  onMaxPrice: (v: string) => void;
}

export const FilterBar = ({
  categories, selectedCategory, search, minPrice, maxPrice,
  onCategory, onSearch, onMinPrice, onMaxPrice
}: Props) => (
  <div className="filter-bar">
    <input
      className="filter-input"
      placeholder="🔍 Məhsul axtar..."
      value={search}
      onChange={e => onSearch(e.target.value)}
    />
    <div className="category-chips">
      <button
        className={`chip ${selectedCategory === null ? 'active' : ''}`}
        onClick={() => onCategory(null)}
      >Hamısı</button>
      {categories.map(c => (
        <button
          key={c.id}
          className={`chip ${selectedCategory === c.id ? 'active' : ''}`}
          onClick={() => onCategory(c.id)}
        >{c.name}</button>
      ))}
    </div>
    <div className="price-range">
      <input
        className="filter-input small"
        placeholder="Min ₼"
        value={minPrice}
        onChange={e => onMinPrice(e.target.value)}
        type="number"
      />
      <span>—</span>
      <input
        className="filter-input small"
        placeholder="Max ₼"
        value={maxPrice}
        onChange={e => onMaxPrice(e.target.value)}
        type="number"
      />
    </div>
  </div>
);