import dynamic from 'next/dynamic';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import cartStyles from '../styles/Cart.module.scss';
import productStyles from '../styles/Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const CartScreen = () => {
  const router = useRouter();
  const {
    state: { cart: data },
    dispatch,
  } = useContext(Store);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const clickChangeHandler = (param) => {
    data.cartItems.map(
      (item) =>
        (item.is_change =
          item.id === param.id &&
          item.product_size === param.product_size &&
          item.product_color === param.product_color
            ? !item.is_change
            : false)
    );
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const updateCartHandler = (obj, type) => {
    data.cartItems.map((item) => {
      if (
        item.id === obj.id &&
        item.product_size === obj.product_size &&
        item.product_color === obj.product_color
      ) {
        item.quantity =
          type === 'increment'
            ? item.quantity + 1
            : item.quantity > 0
            ? item.quantity - 1
            : 0;
      }
    });
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        ...obj,
        total_Product_price: obj.product_price * obj.quantity,
        quantity: obj.quantity,
      },
    });
  };

  return (
    <Layout>
      <div className={cartStyles.content}>
        <div className={cartStyles.title}>Shopping Cart</div>
        {data.cartItems.length === 0 ? (
          <div className={cartStyles.title + ' ' + cartStyles.center}>
            Cart is Empty
          </div>
        ) : (
          <div>
            <div className={cartStyles.custom_table}>
              {data.cartItems.map((item, idx) => (
                <div className={cartStyles.item_holder} key={idx}>
                  <div className={cartStyles.header_item}>
                    <div className={cartStyles.seller_name}>
                      {item.seller_name}
                    </div>
                    <div
                      className={cartStyles.change_item}
                      onClick={() => clickChangeHandler(item)}
                    >
                      <div onClick={forceUpdate}>Ubah</div>
                    </div>
                  </div>
                  <div className={cartStyles.item_content}>
                    <NextLink href={`/product/${item.id}`} passHref>
                      <div className={cartStyles.image_holder}>
                        <Image
                          src={item.picture}
                          alt={item.name}
                          width={180}
                          height={180}
                        />
                      </div>
                    </NextLink>
                    <div className={cartStyles.text_holder}>
                      <div className={cartStyles.text_section}>
                        <div className={cartStyles.product_name}>
                          {item.name}
                        </div>
                        <div className={cartStyles.variant}>
                          Variant: {item.product_color}, {item.product_size}
                        </div>
                        <div className={cartStyles.pricePerItem}>
                          Rp. {item.product_price}
                        </div>
                        <div className={cartStyles.input_holder}>
                          <button
                            className={
                              productStyles.quantity_modifier +
                              ' ' +
                              productStyles.quantity_modifier__left
                            }
                            onClick={() => updateCartHandler(item, 'decrement')}
                          >
                            <FontAwesomeIcon icon={faMinus} size="xs" />
                          </button>
                          <input
                            className={productStyles.quantity_screen}
                            type={productStyles.text}
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className={
                              productStyles.quantity_modifier +
                              ' ' +
                              productStyles.quantity_modifier__right
                            }
                            onClick={() => updateCartHandler(item, 'increment')}
                          >
                            <FontAwesomeIcon icon={faPlus} size="xs" />
                          </button>
                        </div>
                      </div>
                      {item.is_change ? (
                        <div className={cartStyles.button_section}>
                          <button onClick={() => removeItemHandler(item)}>
                            Delete
                          </button>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>

            <div className={cartStyles.total_holder}>
              <div className={cartStyles.total}>
                {'Total Rp '}
                {data.cartItems.reduce(
                  (a, c) => a + c.quantity * c.product_price,
                  0
                )}
              </div>
              <div className={cartStyles.checkout}>
                <button
                  onClick={() => {
                    router.push('/shipping');
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
