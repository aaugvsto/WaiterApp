import { useEffect } from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Orders';
import { formatCurrency } from '../../utils/formatCurrency';

import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

interface OrderModalProps {

  visible: boolean;
  order: Order | null;
  onClose: () => void;

}

export function OrderModal({ visible, order, onClose }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Escape'){
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if(!visible || !order) {
    return null;
  }

  const total = order.products.reduce((acc, { product, quantity } ) => {
    return acc + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa 2</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="CLOSE_ICON" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}´
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de Espera'}´
              {order.status === 'IN_PRODUCTION' && 'Em Produção'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({__id, product, quantity}) => (
              <div className="item" key={__id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="48"
                  height="28.51"
                />

                <span className="quantity">
                  {quantity}X
                </span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type="button" className="primary">
            <span>👨‍🍳</span>
            <strong>Iniciar Produção</strong>
          </button>

          <button type="button" className="secundary">
            <span>❌</span>
            <strong>Cancelar Pedido</strong>
          </button>
        </Actions>

      </ModalBody>
    </Overlay>
  );

}
