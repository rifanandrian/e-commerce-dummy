import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import productListStyles from '../styles/ProductList.module.scss';
import ProductItem from '../components/ProductItem';
import { environment } from '../environment/environment';
import Spinner from '../components/Spinner';

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;

  const fetchData = async () => {
    try {
      const products = await fetch(`${environment.baseUrl}products`)
        .then((response) => response.json())
        .then((data) => setState({ products: data.products, loading: false }));
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="">get data error</div>
      ) : (
        <div className={productListStyles.content}>
          {products.map((product) => (
            <ProductItem product={product} key={product.id}></ProductItem>
          ))}
        </div>
      )}
    </Layout>
  );
}
