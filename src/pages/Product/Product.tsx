import { useParams } from 'react-router';

const Product = () => {
  const { id } = useParams();

  return <div>Product ID: {id}</div>;
};

export default Product;
