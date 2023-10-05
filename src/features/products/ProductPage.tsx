import React, { useState } from 'react';
import { Product } from '../../app/types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProduct, updateProduct, sortProductsList } from './productsSlice';
import { selectAllProductComments } from '../comments/commentsSlice';
import { ModalWindow } from '../../components/ModalWindow';
import { ProductInputForm } from './ProductInputForm';
import CommmentCard from '../comments/CommentCard';
import './styles/productPage.scss';

export function ProductPage({
  id,
  imageUrl,
  name,
  count,
  size: { width, height },
  weight,
}: Product) {

  const [showModalWindow, setShowModalWindow] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const initialParams = {
    imageUrl,
    name,
    count: count.toString(),
    width: width.toString(),
    height: height.toString(),
    weight,
  };
  const [params, setParams] = useState(initialParams);
  const comments = useAppSelector((state) => selectAllProductComments(state, id));
  const dispatch = useAppDispatch();


  function handleFormInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;

    switch (name) {
      case 'count':
      case 'width':
      case 'height':
        if (!isNaN(+value.trim())) {
          value = value.trim();
        } else return;
    }

    setParams({
      ...params,
      [name]: value,
    });
  }

  const isParamsEmpty = () => Object.values(params).some((f) => f.trim() === '');

  function confirmUpdatingProduct() {
    if (isParamsEmpty()) {
      setFieldError(true);
      return;
    }

    const updatedItem = {
      id,
      imageUrl: params.imageUrl.trim(),
      name: params.name.trim(),
      count: +params.count,
      size: {
        width: +params.width,
        height: +params.height,
      },
      weight: params.weight.trim(),
      comments: [...comments],
    };

    dispatch(updateProduct(updatedItem));
    dispatch(sortProductsList('alphabetically'));
    dispatch(selectProduct(id));
    setShowModalWindow(false);
    setFieldError(false);
  }

  function cancelUpdatingProduct() {
    setShowModalWindow(false);
    setFieldError(false);
    setParams(initialParams);
  }

  return (
    <div className="productPage">
      <div className="productPage__main">
        <div className="productPage__main__image">
          <img src={imageUrl} alt="telephone" width="500px" height="auto" />
        </div>
        <div className="productPage__main__about">
          <div className="productPage__main__about__params">
            <h2>{name}</h2>
            <p>In stock: {count} pieces</p>
            <p>Product width: {width}mm</p>
            <p>Product height: {height}mm</p>
            <p>Product weight: {weight}</p>
          </div>
          <div className="productPage__main__about__controls">
            <button onClick={() => setShowModalWindow(true)}>edit product</button>
            <button onClick={() => dispatch(selectProduct(-1))}>back</button>
            <ModalWindow
              show={showModalWindow}
              title="Updating product details"
              errorMessage={fieldError}
              onConfirm={confirmUpdatingProduct}
              onCancel={cancelUpdatingProduct}
            >
              <ProductInputForm params={params} handler={handleFormInputChange} />
            </ModalWindow>
          </div>
        </div>
      </div>
      <CommmentCard id={id} />
    </div>
  );
}
