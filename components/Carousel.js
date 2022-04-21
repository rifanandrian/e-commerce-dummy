import React, { useEffect, useRef, useState } from 'react';
import carouseStyles from '../styles/Carousel.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const ImageCarousel = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState({});
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef.current[newIdx]) {
        carouselItemsRef.current[newIdx]?.scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <div className={carouseStyles.carousel_container}>
      <div
        className={carouseStyles.selected_image}
        style={{ backgroundImage: `url(${selectedImage.url})` }}
      />
      <div className={carouseStyles.carousel}>
        <div className={carouseStyles.carousel_images}>
          {images &&
            images.map((image, idx) => (
              <div
                onClick={() => handleSelectedImageChange(idx)}
                style={{ backgroundImage: `url(${image.url})` }}
                key={image.id}
                className={
                  carouseStyles.carousel_image +
                  ` ${
                    selectedImageIndex === idx &&
                    carouseStyles.carousel_image_selected
                  }`
                }
              />
            ))}
        </div>
        <button
          className={
            carouseStyles.carousel_button +
            ' ' +
            carouseStyles.carousel_button_left
          }
          onClick={handleLeftClick}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          className={
            carouseStyles.carousel_button +
            ' ' +
            carouseStyles.carousel_button_right
          }
          onClick={handleRightClick}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
