"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariant = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const inventory_entity_1 = require("../../inventory/entities/inventory.entity");
let ProductVariant = class ProductVariant {
    id;
    product;
    sku;
    price;
    compareAtPrice;
    attributes;
    inventory;
    createdAt;
    updatedAt;
};
exports.ProductVariant = ProductVariant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductVariant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.variants, { onDelete: 'CASCADE' }),
    __metadata("design:type", product_entity_1.Product)
], ProductVariant.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ProductVariant.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "compareAtPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], ProductVariant.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => inventory_entity_1.Inventory, (inventory) => inventory.variant, { cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", inventory_entity_1.Inventory)
], ProductVariant.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductVariant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductVariant.prototype, "updatedAt", void 0);
exports.ProductVariant = ProductVariant = __decorate([
    (0, typeorm_1.Entity)('product_variants')
], ProductVariant);
//# sourceMappingURL=product-variant.entity.js.map