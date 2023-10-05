import React, { useState } from 'react';
import { Product } from '../../app/types';
import { useAppDispatch } from '../../app/hooks';
import { removeProduct, selectProduct } from './productsSlice';
import { ModalWindow } from '../../components/ModalWindow';
import './styles/productCard.scss';

export function ProductCard({ id, imageUrl, name }: Product) {
  const [showModalWindow, setShowModalWindow] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='card'>
      <div className='card__image'>
        <img src={imageUrl} alt='telephone' width='300px' height='auto' />
      </div>
      <span className='card__name'>{name}</span>
      <div className='card__buttons'>
        <button className='card__buttons__view' onClick={() => dispatch(selectProduct(id))}>
          view
        </button>
        <button className='card__buttons__remove' onClick={() => setShowModalWindow(true)}>
          delete
        </button>
      </div>
      <ModalWindow
        show={showModalWindow}
        title='Product removal'
        errorMessage={false}
        onConfirm={() => dispatch(removeProduct(id))}
        onCancel={() => setShowModalWindow(false)}
      >
        <p>Are you sure you want to remove the product?</p>
      </ModalWindow>
    </div>
  );
}
