import { cartAtions } from '../../store/slice/cart';
import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux'

const CartButton = (props) => {
  const totalQuantity = useSelector((state)=> state.cart.totalQuantity);
  const dispatch = useDispatch();
  const handleShowCart = ()=> {
    dispatch(cartAtions.showCart())
  }
  return (
    <button className={classes.button} onClick={handleShowCart}>
      <span>My Cart</span>
      {totalQuantity > 0 && <span className={classes.badge}>{totalQuantity}</span>}
    </button>
  );
};

export default CartButton;
