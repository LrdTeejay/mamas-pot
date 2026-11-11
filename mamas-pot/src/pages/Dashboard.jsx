import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES, MENU } from '../data/menu';
import FoodCard from '../components/FoodCard';
import OptionsModal from '../components/OptionsModal';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

const SORTS = {
  recommended: { label: 'Recommended', fn: () => 0 },
  priceLow: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  priceHigh: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('recommended');
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.filter((item) => category === 'All' || item.category === category)
      .filter((item) => !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q))
      .sort(SORTS[sort].fn);
  }, [query, category, sort]);

  // "All" with no search shows grouped sections; anything else shows one results grid
  const grouped = category === 'All' && !query.trim();

  const renderGrid = (items) => (
    <div className="grid">
      {items.map((item, i) => (
        <FoodCard key={item.id} item={item} index={i} onSelect={setSelected} />
      ))}
    </div>
  );

  return (
    <>
      <section className="hero">
        <h1>{greeting()}, {user.name.split(' ')[0]}! What are we eating today?</h1>
        <p>Freshly cooked Nigerian meals, snacks and drinks, delivered hot across Lagos.</p>
        <div className="search">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="Search jollof, suya, zobo…" value={query}
            onChange={(e) => setQuery(e.target.value)} aria-label="Search the menu" />
        </div>
        <span className="hero-emoji" aria-hidden="true">🥘</span>
      </section>

      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Categories">
          {CATEGORIES.map((c) => (
            <button key={c} role="tab" aria-selected={category === c}
              className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort dishes">
          {Object.entries(SORTS).map(([key, s]) => <option key={key} value={key}>{s.label}</option>)}
        </select>
      </div>

      {results.length === 0 ? (
        <div className="empty">
          <div className="empty-emoji">🤷🏾</div>
          <p>No dishes match “{query}”. Try a different word, like rice or soup.</p>
        </div>
      ) : grouped ? (
        CATEGORIES.slice(1).map((cat) => (
          <section key={cat} style={{ marginBottom: 36 }}>
            <h2 className="section-title">{cat}</h2>
            {renderGrid(results.filter((i) => i.category === cat))}
          </section>
        ))
      ) : (
        renderGrid(results)
      )}

      {selected && <OptionsModal item={selected} onClose={closeModal} />}
    </>
  );
}
