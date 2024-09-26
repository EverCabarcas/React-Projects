import { Link } from "react-router-dom";

export default function Products() {
  const PRODUCTS = [
    {
      id: 'p1', title: 'producto 1'
    },
    {
      id: 'p2', title: 'producto 2'
    },
    {
      id: 'p3', title: 'producto 3'
    }
  ]
  return (
    <>
      <h1>My Products Page</h1>
      <ul>
        {PRODUCTS.map((product)=> (<li key={product.id} ><Link to={`/products/${product.id}`}>{product.title}</Link></li>))}
      </ul>
    </>
  );
}
