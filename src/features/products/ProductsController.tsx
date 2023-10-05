import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addProduct } from './productsSlice';
import { sortProductsList } from './productsSlice';
import { DropdownMenu } from '../../components/CustomDropdownMenu';
import { ModalWindow } from '../../components/ModalWindow';
import { ProductInputForm } from './ProductInputForm';
import { v4 as uuidv4 } from 'uuid';
import './styles/productController.scss';

const initialParams = {
  imageUrl: '',
  name: '',
  count: '',
  width: '',
  height: '',
  weight: ''
};

export function ProductsController() {
  const [showOpenModal, setOpenShowModal] = useState(false);
  const [validateFieldError, setValidateFieldError] = useState(false);
  const [productParams, setProductParams] = useState(initialParams);
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

    setProductParams({
      ...productParams,
      [name]: value
    });
  }

  const isParamsEmpty = () => Object.values(productParams).some(f => f.trim() === '');

  function confirmAddingProduct() {
    if (isParamsEmpty()) {
      setValidateFieldError(true);
      return;
    }

    const p = productParams;
    const newItem = {
      id: uuidv4(),
      imageUrl: p.imageUrl.trim(),
      name: p.name.trim(),
      count: +p.count,
      size: {
        width: +p.width,
        height: +p.height
      },
      weight: p.weight.trim(),
      comments: []
    };

    dispatch(addProduct(newItem));
    dispatch(sortProductsList('alphabetically'))
    setOpenShowModal(false);
    setValidateFieldError(false);
    setProductParams(initialParams);
  }

  function cancelAddingProduct() {
    setOpenShowModal(false);
    setValidateFieldError(false);
    setProductParams(initialParams);
  }

  return (
    <div className='controlPanel'>
      <span>Sort products:</span>
      <DropdownMenu
        modes={['alphabetically', 'by quantity']}
        onMenuOption={(mode) => dispatch(sortProductsList(mode))}
      />
      <button className='controlPanel__addButton' onClick={() => setOpenShowModal(true)}>
        add product
      </button>
      <ModalWindow
        show={showOpenModal}
        title='Setting new product details'
        errorMessage={validateFieldError}
        onConfirm={confirmAddingProduct}
        onCancel={cancelAddingProduct}
      >
        <ProductInputForm params={productParams} handler={handleFormInputChange} />
      </ModalWindow>
    </div>
  );
}
