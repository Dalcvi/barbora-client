import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemsPage } from '../items-page';
import { Orders } from '../orders-page/orders.component';
// import your route components too

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ItemsPage />} />
        <Route path="/puslapis-:page" element={<ItemsPage />} />
        <Route path="/uzsakymai" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
};
