import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategories } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrders } from './app/useCases/orders/createOrder';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteProduct } from './app/useCases/products/deleteProduct';
import { deleteCategory } from './app/useCases/categories/deleteCategory';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb)  {
      cb(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategories);

// Delete category
router.delete('/categories/:categoryId', deleteCategory);

// List Products
router.get('/products', listProducts);

// Create Product
router.post('/products', upload.single('image'), createProduct);

// Get Products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// Delete Product
router.delete('/products/:productId', deleteProduct);

// List Orders
router.get('/orders', listOrders);

// Create Order
router.post('/orders', createOrders);

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel Order
router.delete('/orders/:orderId', cancelOrder);
