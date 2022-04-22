import Image from 'next/image';
import NextLink from 'next/link';
import productListStyles from '../styles/ProductList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function ProductItem({ product }) {
  return (
    <NextLink href={`/product/${product.id}`} passHref>
      <div className={productListStyles.product_items} key={product.id}>
        <div className={productListStyles.img_holder}>
          <Image
            src={product.picture}
            alt="product_image"
            width="100%"
            height="100%"
            layout="responsive"
          />
        </div>
        <div className={productListStyles.text_holder}>
          <div className="">
            <div className={productListStyles.product_name}>
              {product.product_name}
            </div>
          </div>
          <div className="">
            <div className={productListStyles.product_price}>
              Rp. {product.price}
            </div>
            <div className={productListStyles.product_rating}>
              {product.rating > 5 ? 5 : product.rating}{' '}
              <FontAwesomeIcon
                className={productListStyles.icon_star}
                icon={faStar}
              />{' '}
              | ({product.number_review} reviews)
            </div>
          </div>
        </div>
      </div>
    </NextLink>
  );
}
