import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      모바일 사이즈 레이아웃으로 감싸기
      <Outlet />
    </div>
  );
}
