import './styles/headerWrapper.scss';
import { useAppDispatch } from '../hooks';

import { selectProduct } from '../../features/products/productsSlice';
export function HeaderWrapper() {
  const dispatch = useAppDispatch();
  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(selectProduct(-1));
  }

  return (
    <header>
      <p><a href='/' onClick={handleOnClick}>CallTelePhone</a></p>
      <nav>
        <ul>
          <li><a href='/' onClick={handleOnClick}>Home page</a></li>
          <li><a href='/'>Find us</a></li>
          <li><a href='/'>About us</a></li>
          <li><a href='/'>Contact us</a></li>
        </ul>
      </nav>
    </header>
  );
}
