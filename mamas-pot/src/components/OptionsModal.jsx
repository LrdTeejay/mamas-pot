import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { naira } from '../utils/format';

// Required single-choice groups start on their first option, so one tap adds the item
function defaultSelections(item) {
  const sel = {};
  item.options.forEach((g) => {
    sel[g.id] = g.type === 'single' && g.required ? [g.choices[0].name] : [];
  });
  return sel;
}

export default function OptionsModal({ item, onClose }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [selections, setSelections] = useState(() => defaultSelections(item));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');

  // Close on Esc and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function toggle(group, choiceName) {
    setSelections((prev) => {
      const current = prev[group.id];
      if (group.type === 'single') return { ...prev, [group.id]: [choiceName] };
      return {
        ...prev,
        [group.id]: current.includes(choiceName)
          ? current.filter((n) => n !== choiceName)
          : [...current, choiceName],
      };
    });
  }

  const unitPrice = useMemo(() => {
    let price = item.price;
    item.options.forEach((g) => {
      g.choices.forEach((c) => {
        if (selections[g.id].includes(c.name)) price += c.price;
      });
    });
    return price;
  }, [item, selections]);

  function handleAdd() {
    const summary = item.options.flatMap((g) => selections[g.id]).filter(Boolean).join(', ');
    addToCart({
      lineId: `${item.id}|${JSON.stringify(selections)}|${note.trim()}`,
      itemId: item.id,
      name: item.name,
      emoji: item.emoji,
      unitPrice,
      qty,
      summary,
      note: note.trim(),
    });
    showToast(`Added ${qty} × ${item.name} to cart`, 'success');
    onClose();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-emoji">{item.emoji}</div>
          <div style={{ flex: 1 }}>
            <h2 id="modal-title" style={{ fontSize: '1.4rem' }}>{item.name}</h2>
            <p className="muted" style={{ fontSize: '0.9rem' }}>{item.desc}</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-body">
          {item.options.map((group) => (
            <div className="option-group" key={group.id}>
              <h4>
                {group.label}
                <small>{group.type === 'single' ? 'Pick one' : 'Optional, pick any'}</small>
              </h4>
              <div className="option-list">
                {group.choices.map((c) => {
                  const selected = selections[group.id].includes(c.name);
                  return (
                    <button key={c.name} type="button" aria-pressed={selected}
                      className={`option ${selected ? 'selected' : ''}`}
                      onClick={() => toggle(group, c.name)}>
                      {c.name}
                      {c.price > 0 && <span className="extra">+{naira(c.price)}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="field">
            <label htmlFor="note">Note for the kitchen (optional)</label>
            <textarea id="note" rows="2" placeholder="e.g. No onions, extra pepper"
              value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} />
          </div>
        </div>

        <div className="modal-footer">
          <div className="qty" aria-label="Quantity">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
            <span>{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity">+</button>
          </div>
          <button className="btn btn-primary" onClick={handleAdd} style={{ flex: 1 }}>
            Add to cart · {naira(unitPrice * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
