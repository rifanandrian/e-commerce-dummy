import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import productStyles from '../../styles/Product.module.scss';
import { Store } from '../../utils/Store';
import { useSnackbar } from 'notistack';
import { environment } from '../../environment/environment';
import ImageCarousel from '../../components/Carousel';
import Spinner from '../../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faUser,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

export default function ProductScreen(props) {
  const productId = props.productId;
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const [images, setImages] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    color: '',
    size: '',
    quantity: 1,
    product: null,
    loading: true,
    error: '',
  });
  const { color, size, quantity, product, loading, error } = state;

  const onSelectColor = (value) => {
    setState({ ...state, color: value.target.id });
  };

  const onSelectSize = (value) => {
    setState({ ...state, size: value.target.id });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${environment.baseUrl}products/${productId}`)
          .then((res) => res.json())
          .then((data) => {
            setState({ ...state, product: data, loading: false });
          });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();

    setImages(
      Array.from(Array(5).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToChatHandler = async () => {
    const existItem = cart.cartItems.find(
      (x) =>
        x.id === product.id &&
        x.product_size === product.product_size &&
        x.product_color === product.product_color
    );
    const qty = !!existItem ? existItem.quantity + quantity : quantity;
    if (product.product_stock < qty) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        id: product.id,
        name: product.product_name,
        product_stock: product.product_stock,
        product_price: product.price,
        product_color: color,
        product_size: size,
        picture: product.picture,
        seller_name: product.seller_name,
        quantity: qty,
        is_change: false,
      },
    });
    enqueueSnackbar(`${product.product_name} added to the cart`, {
      variant: 'success',
    });
  };

  const increment = () => {
    setState((x) => ({ ...state, quantity: quantity + 1 }));
  };

  const decrement = () => {
    setState((x) => ({ ...state, quantity: quantity > 0 ? quantity - 1 : 0 }));
  };

  return (
    <Layout>
      <div className="content">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="">ceritanya ini page error</div>
        ) : (
          <div className={productStyles.content}>
            <div className={productStyles.main_product_detail}>
              <div className={productStyles.product_picture}>
                <ImageCarousel images={images} />
              </div>
              <div className={productStyles.text_holder}>
                <div className={productStyles.product_name}>
                  {product.product_name}
                </div>
                <div className={productStyles.info_group}>
                  <div className={productStyles.product_rating}>
                    {product.rating >= 5 ? 5 : product.rating}
                    <FontAwesomeIcon
                      className={productStyles.icon_star}
                      icon={faStar}
                    />
                  </div>
                  &nbsp; | &nbsp;
                  <div className={productStyles.product_stock}>
                    {product.product_stock} Review
                  </div>
                  &nbsp; | &nbsp;
                  <div className={productStyles.product_stock}>
                    {product.product_stock} Sold!
                  </div>
                </div>
                <hr />
                <div className={productStyles.product_price}>
                  Rp. {product.price}
                </div>

                <div className={productStyles.semi_table}>
                  <div className={productStyles.width_text}>Color</div>
                  <div className={productStyles.width_input}>
                    <div className={productStyles.product_color}>
                      {product.product_colors.map((obj, idx) => (
                        <div
                          className={productStyles.color}
                          key={idx}
                          style={{ backgroundColor: obj }}
                        >
                          <input
                            name="color"
                            id={obj}
                            onChange={(value) => onSelectColor(value)}
                            type="radio"
                          />
                          <label htmlFor={obj}></label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={productStyles.semi_table}>
                  <div className={productStyles.width_text}>Size</div>
                  <div className={productStyles.width_input}>
                    <div className={productStyles.product_color}>
                      {product.sizes.map((obj, idx) => (
                        <div className={productStyles.color} key={idx}>
                          <input
                            name="size"
                            id={obj}
                            onChange={(value) => onSelectSize(value)}
                            type="radio"
                          />
                          <label htmlFor={obj}>{obj}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={productStyles.semi_table}>
                  <div className={productStyles.width_text}>Delivery</div>
                  <div className={productStyles.width_input}>Kilat</div>
                </div>

                <div className={productStyles.semi_table}>
                  <div className={productStyles.width_text}>Quantity</div>
                  <div className={productStyles.width_input}>
                    <button
                      className={
                        productStyles.quantity_modifier +
                        ' ' +
                        productStyles.quantity_modifier__left
                      }
                      onClick={decrement}
                    >
                      <FontAwesomeIcon icon={faMinus} size="xs" />
                    </button>
                    <input
                      className={productStyles.quantity_screen}
                      type={productStyles.text}
                      value={quantity}
                      readOnly
                    />
                    <button
                      className={
                        productStyles.quantity_modifier +
                        ' ' +
                        productStyles.quantity_modifier__right
                      }
                      onClick={increment}
                    >
                      <FontAwesomeIcon icon={faPlus} size="xs" />
                    </button>
                  </div>
                </div>

                <div className={productStyles.btn_holder}>
                  <button onClick={addToChatHandler}>Add to chart</button>
                </div>
              </div>
            </div>

            {/* <div className={productStyles.product_company}>test</div> */}

            <div className={productStyles.description_holder}>
              <div className={productStyles.basic_info_section}>
                <div className={productStyles.product_info}>
                  <div className={productStyles.header_info}>
                    Product Adjective
                  </div>
                  :&nbsp;{product.product_adjective}
                </div>
                <div className={productStyles.product_info}>
                  <div className={productStyles.header_info}>
                    Product Category
                  </div>
                  :&nbsp;{product.product_category}
                </div>
                <div className={productStyles.product_info}>
                  <div className={productStyles.header_info}>
                    Product Material
                  </div>
                  :&nbsp;{product.product_material}
                </div>
                <div className={productStyles.product_info}>
                  <div className={productStyles.header_info}>Department</div>
                  :&nbsp;{product.product_department}
                </div>
                <div className={productStyles.product_info}>
                  <div className={productStyles.header_info}>Stock</div>
                  :&nbsp;{product.product_stock}
                </div>
              </div>

              <div className={productStyles.description_section}>
                <div className={productStyles.product_description}>
                  {product.product_description}
                </div>
              </div>
            </div>

            <div className={productStyles.product_review}>
              <div className={productStyles.title}>Review</div>
              {product.review.map((obj, idx) => (
                <div className={productStyles.review_holder} key={idx}>
                  <div className={productStyles.photo_reviewer}>
                    <FontAwesomeIcon
                      className={productStyles.icon_avatar}
                      icon={faUser}
                      size="xs"
                    />
                    {/* {obj.avatar} */}
                  </div>
                  <div className={productStyles.review_section}>
                    <div className={productStyles.name_reviewer}>
                      {obj.name}
                    </div>
                    <div className={productStyles.review}>{obj.review}</div>
                    <div className={productStyles.likes}>
                      <FontAwesomeIcon
                        className={productStyles.icon_likes}
                        icon={faHeart}
                        size="xs"
                      />
                      {obj.like}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export function getServerSideProps(context) {
  const productId = context.params.productId;
  return {
    props: { productId },
  };
}
