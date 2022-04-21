import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import { useSnackbar } from 'notistack';
import { environment } from '../environment/environment';
import Layout from '../components/Layout';
import Dropdown from '../components/Dropdown';
import searchStyle from '../styles/Search.module.scss';
import Spinner from '../components/Spinner';
import ProductItem from '../components/ProductItem';
import productListStyles from '../styles/ProductList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const orderArr = [
  {
    label: 'Lowest',
    value: 'lowest',
  },
  {
    label: 'Highest',
    value: 'highest',
  },
  {
    label: 'Top Rated',
    value: 'toprated',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const { category = 'all', search = 'all', sort = 'default' } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: '',
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        fetch(`${environment.baseUrl}products`)
          .then((response) => response.json())
          .then((data) => {
            const rawCategory = data.products.map((obj) => ({
              value: obj.product_category,
              label: obj.product_category,
            }));
            const category = rawCategory.filter(
              (val, idx, self) =>
                idx ===
                self.findIndex(
                  (data) => data.value === val.value && data.label === val.label
                )
            );
            setCategories(category);
          });
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchData = async () => {
      try {
        let sQuery = '?';
        if (category !== 'all') {
          sQuery += `product_category=${category}&`;
        }
        if (search !== 'all') {
          sQuery += `search=${search}&`;
        }

        let order = '';
        if (sort !== 'default') {
          if (sort === 'lowest') order = 'sortBy=price&order=asc';
          if (sort === 'highest') order = 'sortBy=price&order=desc';
          if (sort === 'toprated') order = 'sortBy=rating&order=asc';
        }

        sQuery += order;
        setState({ loading: true });

        fetch(environment.baseUrl + 'products' + sQuery)
          .then((response) => response.json())
          .then((data) => {
            const productArr = data.products;
            setState({ products: productArr, loading: false });
          });
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [category, search, sort]);

  const filterSearch = ({ category, sort, searchQuery }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.value });
    setSelectedCategory(e.value);
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.value });
  };
  const backToSearchHandler = () => {
    setSelectedCategory('');
    router.push('/search');
  };

  return (
    <Layout>
      <div className={searchStyle.content}>
        <div className={searchStyle.filter_holder}>
          <div className={searchStyle.result_filter}>
            {products && products.length !== 0 ? products.length : 'No'} Results
            {search !== 'all' && search !== '' && ' : ' + search}
            {selectedCategory !== '' && ' : Category ' + selectedCategory}
            {sort !== 'default' && ' : Sorting ' + sort}
            {(search !== 'all' && search !== '') ||
            selectedCategory !== '' ||
            sort !== 'default' ? (
              <button
                className={searchStyle.button_close}
                onClick={() => backToSearchHandler()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : null}
          </div>
          <div className={searchStyle.select_filter}>
            <Dropdown
              isSearchable
              placeHolder="Select.."
              options={categories}
              onChange={(value) => categoryHandler(value)}
            />
            &nbsp;&nbsp;
            <Dropdown
              placeHolder="Select.."
              options={orderArr}
              onChange={(value) => sortHandler(value)}
            />
          </div>
        </div>

        <div className={searchStyle.product_holder}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className={productListStyles.content}>
              {products.map((product) => (
                <ProductItem product={product} key={product.id}></ProductItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
