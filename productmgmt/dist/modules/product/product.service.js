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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const product_variant_entity_1 = require("./entities/product-variant.entity");
const inventory_entity_1 = require("../inventory/entities/inventory.entity");
let ProductService = class ProductService {
    productRepository;
    variantRepository;
    constructor(productRepository, variantRepository) {
        this.productRepository = productRepository;
        this.variantRepository = variantRepository;
    }
    async create(createProductDto) {
        const { categoryIds, ...productData } = createProductDto;
        const product = this.productRepository.create(productData);
        if (categoryIds && categoryIds.length > 0) {
            product.categories = categoryIds.map(id => ({ id }));
        }
        return this.productRepository.save(product);
    }
    async findAll() {
        return this.productRepository.find({
            relations: ['categories', 'variants', 'images'],
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['categories', 'variants', 'variants.inventory', 'images'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        const { categoryIds, ...updateData } = updateProductDto;
        Object.assign(product, updateData);
        if (categoryIds !== undefined) {
            product.categories = categoryIds.map((catId) => ({ id: catId }));
        }
        return this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
    async addVariant(productId, createVariantDto) {
        const product = await this.findOne(productId);
        const inventory = new inventory_entity_1.Inventory();
        inventory.sku = createVariantDto.sku;
        const variant = this.variantRepository.create({
            ...createVariantDto,
            product,
            inventory,
        });
        return this.variantRepository.save(variant);
    }
    async removeVariant(productId, variantId) {
        const variant = await this.variantRepository.findOne({
            where: { id: variantId, product: { id: productId } }
        });
        if (!variant) {
            throw new common_1.NotFoundException(`Variant ${variantId} on Product ${productId} not found`);
        }
        await this.variantRepository.remove(variant);
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(product_variant_entity_1.ProductVariant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map