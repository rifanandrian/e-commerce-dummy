import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import shippingStyles from '../styles/Shipping.module.scss';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBolt, faB } from '@fortawesome/free-solid-svg-icons';

const ShippingScreen = () => {
  const router = useRouter();
  const routerQuery = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart, historyOrder } = state;
  const [dataUser, setDataUser] = useState({
    address: '',
  });
  console.log(cart);
  const [dataCart, setDataCart] = useState({
    cartItems: [],
  });
  const [dataHistory, setDataHistory] = useState({
    products: [],
  });
  const [payment] = useState(['Paypal', 'Master Card', 'COD']);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    } else {
      setDataUser(userInfo);
      if (routerQuery.history === 'history') {
        console.log(historyOrder);
        setDataHistory(historyOrder);
      } else {
        setDataCart(cart);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className={shippingStyles.content}>
        <div className={shippingStyles.box_holder}>
          <div className={shippingStyles.address_holder}>
            <div className={shippingStyles.address_icon}>
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className={shippingStyles.address_user}>
              <div className="">{dataUser.address}</div>
              <div className="">{dataUser.city}</div>
              <div className=""> {dataUser.country}</div>
              <div className="">{dataUser.zip_code}</div>
            </div>
          </div>
        </div>
        <div
          className={shippingStyles.box_holder + ' ' + shippingStyles.spacer}
        >
          {routerQuery.history === 'history' ? (
            <>
              {dataHistory.products.map((item, idx) => (
                <div className={shippingStyles.item_holder} key={idx}>
                  <div className={shippingStyles.header_item}>
                    <div className={shippingStyles.seller_name}>
                      {item.seller_name}
                    </div>
                  </div>
                  <div className={shippingStyles.item_content}>
                    <div className={shippingStyles.image_holder}>
                      <Image
                        src={item.picture}
                        alt={item.product_name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className={shippingStyles.text_holder}>
                      <div className={shippingStyles.text_section}>
                        <div className={shippingStyles.product_name}>
                          {item.product_name}
                        </div>
                        <div className={shippingStyles.variant}>
                          Variant: {item.product_color}, {item.product_size}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={shippingStyles.hr} />
                </div>
              ))}

              <div className={shippingStyles.shipping_option}>
                <div className="">Delivery Option</div>
                <div className="">
                  Kilat{' '}
                  <FontAwesomeIcon
                    className={shippingStyles.icon_bolt}
                    icon={faBolt}
                  />
                </div>
              </div>

              <div className={shippingStyles.message_holder}>
                <div className="">Message</div>
                <input type="text" placeholder="Sialakan Tinggalkan Pesan.." />
              </div>

              <div className={shippingStyles.total_price}>
                <div className="">
                  Total Order (
                  {dataHistory.products.reduce((a, c) => a + c.quantity, 0)}{' '}
                  Product)
                </div>
                <div className={shippingStyles.price}>
                  Rp{' '}
                  {dataHistory.products.reduce(
                    (a, c) => a + c.quantity * c.price,
                    0
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {dataCart.cartItems.map((item, idx) => (
                <div className={shippingStyles.item_holder} key={idx}>
                  <div className={shippingStyles.header_item}>
                    <div className={shippingStyles.seller_name}>
                      {item.seller_name}
                    </div>
                  </div>
                  <div className={shippingStyles.item_content}>
                    <div className={shippingStyles.image_holder}>
                      <Image
                        src={item.picture}
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className={shippingStyles.text_holder}>
                      <div className={shippingStyles.text_section}>
                        <div className={shippingStyles.product_name}>
                          {item.name}
                        </div>
                        <div className={shippingStyles.variant}>
                          Variant: {item.product_color}, {item.product_size}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className={shippingStyles.hr} />
                </div>
              ))}

              <div className={shippingStyles.shipping_option}>
                <div className="">Delivery Option</div>
                <div className="">Kilat</div>
              </div>

              <div className={shippingStyles.message_holder}>
                <div className="">Message</div>
                <input type="text" placeholder="Sialakan Tinggalkan Pesan.." />
              </div>

              <div className={shippingStyles.total_price}>
                <div className="">
                  Total Order (
                  {dataCart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  Product)
                </div>
                <div className={shippingStyles.price}>
                  Rp{' '}
                  {dataCart.cartItems.reduce(
                    (a, c) => a + c.quantity * c.product_price,
                    0
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className={shippingStyles.box_holder + ' ' + shippingStyles.spacer}
        >
          <div className={shippingStyles.payment_holder}>
            <div className={shippingStyles.payment_method}>
              {routerQuery.history === 'history'
                ? 'Payment Methods'
                : 'Choose Payment Methods'}
            </div>
            <div className={shippingStyles.payment_option}>
              {routerQuery.history === 'history' ? (
                <>
                  <div className={shippingStyles.button}>
                    <input
                      type="radio"
                      id="paypall"
                      name="payment"
                      disabled
                      checked
                    />
                    <label htmlFor="paypall">Paypal</label>
                  </div>
                </>
              ) : (
                <>
                  {payment.map((arrVal, idx) => (
                    <div className={shippingStyles.button} key={idx}>
                      <input type="radio" id={arrVal} name="payment" />
                      <label htmlFor={arrVal}>{arrVal}</label>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={shippingStyles.button_holder}>
          <button
            onClick={() => {
              router.push('/order-history');
            }}
          >
            {routerQuery.history === 'history'
              ? 'Back to History'
              : 'Place Order'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingScreen;
