import { Outlet } from 'react-router-dom';

import SvgIcon from './components/@common/Svg/SvgIcon';

export default function App() {
  return (
    <div>
      모바일 사이즈 레이아웃으로 감싸기
      <SvgIcon variant='allInfo' />
      <Outlet />
    </div>
  );
}
