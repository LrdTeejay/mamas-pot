import { naira } from '../utils/format';

export default function FoodCard({ item, index, onSelect }) {
  const highlight = item.tags.find((t) => t !== 'Veg');
  const isVeg = item.tags.includes('Veg');
  const canCostMore = item.options.some((g) => g.choices.some((c) => c.price > 0));

  return (
    <article className="card" style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}>
      <div className="card-emoji">
        {highlight && <span className="tag">{highlight}</span>}
        {isVeg && <span className="tag veg">Veg</span>}
        <span className="food" role="img" aria-label={item.name}>{item.emoji}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        <p className="card-desc">{item.desc}</p>
        <span className="rating">⭐ {item.rating.toFixed(1)}</span>
        <div className="card-meta">
          <span className="price">
            {canCostMore && <small className="muted" style={{ fontWeight: 500 }}>from </small>}
            {naira(item.price)}
          </span>
          <button className="btn btn-primary btn-sm" onClick={() => onSelect(item)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
