import useHttp from "../hooks/useHttp";
import ProductItem from "./ProductItem";
import Error from './Error'

const requestConfig = {};

export default function Products() {
  const {data: products, isLoading, error} = useHttp('http://localhost:3000/meals',requestConfig, []);

  if(isLoading){
    return <p className="center">Fetching Products...</p>
  }

  if(error){
    return <Error title="Failed to fetch products" message={error} />
  }
  return (
    <div>
      <ol id="meals">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ol>
    </div>
  );
}
