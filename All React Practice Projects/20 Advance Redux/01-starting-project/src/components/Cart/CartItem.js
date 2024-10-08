import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartAtions } from '../../store/slice/cart';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;
  const dispatch = useDispatch()

  const handleAdd = ()=> {
    dispatch(cartAtions.addItem({id, price, title}))
  }

  const handleDelete = () => {
    dispatch(cartAtions.deleteItem(id))
  }

  return (
    <li className={classes.item} key={id}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDelete}>-</button>
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
