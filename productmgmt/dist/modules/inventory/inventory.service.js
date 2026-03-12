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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("./entities/inventory.entity");
let InventoryService = class InventoryService {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async findBySku(sku) {
        const inventory = await this.inventoryRepository.findOne({ where: { sku } });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory for SKU ${sku} not found`);
        }
        return inventory;
    }
    async adjustStock(id, adjustDto) {
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory record ${id} not found`);
        }
        const newQuantity = inventory.quantityAvailable + adjustDto.quantityToAdjust;
        if (newQuantity < 0) {
            throw new common_1.BadRequestException(`Adjustment would result in negative available inventory (Current: ${inventory.quantityAvailable}, Adjustment: ${adjustDto.quantityToAdjust})`);
        }
        inventory.quantityAvailable = newQuantity;
        return this.inventoryRepository.save(inventory);
    }
    async reserveStock(id, reserveDto) {
        if (reserveDto.quantityToReserve <= 0) {
            throw new common_1.BadRequestException('Reservation quantity must be greater than 0');
        }
        const inventory = await this.inventoryRepository.findOne({ where: { id } });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory record ${id} not found`);
        }
        if (inventory.quantityAvailable < reserveDto.quantityToReserve) {
            throw new common_1.BadRequestException(`Insufficient stock available to reserve ${reserveDto.quantityToReserve} items.`);
        }
        inventory.quantityAvailable -= reserveDto.quantityToReserve;
        inventory.quantityReserved += reserveDto.quantityToReserve;
        return this.inventoryRepository.save(inventory);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map