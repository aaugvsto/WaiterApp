import { Container } from './styles';
import { OrdersBoard } from '../OrdersBoard';
import { Order } from '../../types/Orders';

const orders: Order[] = [

];

export function Orders(){
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de Espera"
        orders={orders}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={orders}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={orders}
      />
    </Container>
  );
}
