import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { environment } from '../environment/environment';
import { Store } from '../utils/Store';
import historyStyle from '../styles/History.module.scss';
import { useRouter } from 'next/router';

const OrderHistory = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [dataHistory, setDataHistory] = useState([
    {
      createdAt: '',
      id: 0,
      idOrderHistory: '',
      idUser: 0,
      price: '',
      status: '',
      slug: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await fetch(`${environment.baseUrl}/order-history`)
          .then((res) => res.json())
          .then((data) => {
            // const filter = data.filter(
            //   (x) => x.idUser == parseInt(userInfo.id)
            // );
            setDataHistory(data);
          });
      } catch (err) {}
    };
    fetchData();
  }, []);

  const viewHIstoryOrderHandler = (item) => {
    dispatch({
      type: 'HISTORY_ADD_ITEM',
      payload: {
        ...item,
      },
    });
  };

  return (
    <Layout>
      <div className={historyStyle.content}>
        <div className={historyStyle.title}>Order History</div>
        <div className={historyStyle.custom_table}>
          <div className={historyStyle.table_head}>
            <div className={historyStyle.width_a}>Order Id</div>
            <div className={historyStyle.width_b}>Date</div>
            <div className={historyStyle.width_c}>Total</div>
            <div className={historyStyle.width_d}>Status</div>
            <div className={historyStyle.width_e}></div>
          </div>

          {dataHistory.map((obj, idx) => (
            <div className={historyStyle.table_body} key={idx}>
              <div className={historyStyle.width_a}>{obj.slug}</div>
              <div className={historyStyle.width_b}>{obj.createdAt}</div>
              <div className={historyStyle.width_c}>{obj.price}</div>
              <div className={historyStyle.width_d}>{obj.status_payment}</div>
              <div className={historyStyle.width_e}>
                <button
                  onClick={() => {
                    router.push('/shipping?history=history');
                    viewHIstoryOrderHandler(obj);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OrderHistory;
