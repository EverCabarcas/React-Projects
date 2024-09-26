import { currencyFormatter } from "../util/formatting";

export default function CartItem({ item, increase, decrease }) {
  return (
    <li key={item.id} className="cart-item">
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={decrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={increase}>+</button>
      </p>
    </li>
  );
}
