import { Router } from 'express';
import Route from '../interfaces/routes.interface';
import authProviderMiddleware from '../middlewares/authProvide.middleware';
import multer from 'multer';
import fs from 'fs';
import shortid from 'shortid';
import ProductController from '../controllers/product.controller';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path: string;
    if (file.mimetype.includes('image')) {
      path = 'uploads/products/';
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    const a = file.originalname.split('.');
    cb(null, `${shortid.generate()}-${Date.now()}.${a[a.length - 1]}`);
  },
});
const uploadMiddleware = multer({ storage: storage });

class ProductRoute implements Route {
  public path = '/products';
  public router = Router();
  public productController = new ProductController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/product/new`, authProviderMiddleware, uploadMiddleware.single('file'), this.productController.createProduct);
    this.router.get(`${this.path}/categories`, this.productController.findCategorie);
    this.router.get(`${this.path}/product/:id`, this.productController.getProduct)
  }

}

export default ProductRoute;