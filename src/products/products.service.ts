import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number): string {
    const id = `${new Date().getTime().toString()}`;
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(id: string): Product {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(id: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    if (!index) {
      throw new NotFoundException('Produto não encontrado');
    }
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    return [product, productIndex];
  }
}
