import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

export const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    axios.get('/order').then(({ data }) => {
      setOrders(data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ListGroup>
      {orders.map((order) => (
        <ListGroup.Item>
          <p>Id: {order.id}</p>
          <p>Adresas: {order.address}</p>
          <p>Komentaras: {order.comment}</p>
          <p>Pašto kodas: {order.postal_code}</p>
          <p>Pristatyti: {order.deliver_at}</p>
          <p>Kaina: {order.price}</p>
          <p>Sukurtas: {order.created_at}</p>
          <p>Statusas: {order.status}</p>
          <p>
            Užsakytos prekės: <br />
            <div style={{ marginLeft: '50px' }}>
              {order.order_items.map((item: any) => {
                return Object.entries(item).map(([key, value]) => {
                  return <p>{`${key}: ${value}`}</p>;
                });
              })}
            </div>
          </p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
