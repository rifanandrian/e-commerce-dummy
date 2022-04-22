import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import productListStyles from '../styles/ProductList.module.scss';
import ProductItem from '../components/ProductItem';
import { environment } from '../environment/environment';
import Spinner from '../components/Spinner';
import ImageCarousel from '../components/Carousel';
import homeStyles from '../styles/Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShirt,
  faShield,
  faPencil,
  faCamera,
  faLaptop,
  faMobile,
  faRecordVinyl,
  faHeadphones,
  faGuitar,
  faBook,
  faAppleWhole,
  faTicket,
  faUmbrella,
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;
  const [images, setImages] = useState();

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
    setImages(
      Array.from(Array(5).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`,
      }))
    );
  }, []);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="">get data error</div>
      ) : (
        <>
          <div className={homeStyles.content}>
            <div className={homeStyles.carousel}>
              <ImageCarousel images={images} isAutomated={true} />
            </div>
          </div>
          <div className={homeStyles.content}>
            <div className={homeStyles.blok_category}>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faBook} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faShirt} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faShield} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faRecordVinyl} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faHeadphones} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faLaptop} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faMobile} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faGuitar} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faAppleWhole} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faUmbrella} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faTicket} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
              <div className={homeStyles.category_holder}>
                <div className={homeStyles.icon_category}>
                  <FontAwesomeIcon icon={faGuitar} />
                </div>
                <div className={homeStyles.text_category}>text</div>
              </div>
            </div>
          </div>
          <div className={productListStyles.content}>
            {products.map((product) => (
              <ProductItem product={product} key={product.id}></ProductItem>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
