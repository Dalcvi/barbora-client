import { Routes, Route } from 'react-router-dom';
import { Login, Register } from '../authorization-page';
import { ItemsPage } from '../items-page';
import { Orders } from '../orders-page/orders.component';
import { Transactions } from '../transactions-page';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<ItemsPage />} />
      <Route path="/kategorija/:category" element={<ItemsPage />} />
      <Route path="/puslapis-:page" element={<ItemsPage />} />
      <Route path="/uzsakymai" element={<Orders />} />
      <Route path="/transakcijos" element={<Transactions />} />
      <Route path="/prisijungti" element={<Login />} />
      <Route path="/registracija" element={<Register />} />
    </Routes>
  );
};
