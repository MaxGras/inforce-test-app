import { useAppSelector } from '../hooks';
import { selectCurrentProduct } from '../../features/products/productsSlice';
import { ProductsController } from '../../features/products/ProductsController';

import { ProductsList } from '../../features/products/ProductsList';
import { ProductPage } from '../../features/products/ProductPage';
import './styles/mainWrapper.scss';

export function MainWrapper() {
  const product = useAppSelector(selectCurrentProduct);

  return (
    <main className='main'>
      {
        product ? <ProductPage {...product} />
          : <>
            <ProductsController />
            <ProductsList />
          </>
      }
    </main>
  );
}