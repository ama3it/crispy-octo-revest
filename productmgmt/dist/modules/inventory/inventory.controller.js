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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const inventory_service_1 = require("./inventory.service");
const inventory_dto_1 = require("./dto/inventory.dto");
let InventoryController = class InventoryController {
    inventoryService;
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async reserveStockInternal(data) {
        try {
            const result = await this.inventoryService.reserveStock(data.inventoryId, { quantityToReserve: data.quantityToReserve });
            return { success: true, inventory: result };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async adjustStockInternal(data) {
        try {
            const result = await this.inventoryService.adjustStock(data.inventoryId, {
                inventoryId: data.inventoryId,
                quantityToAdjust: data.quantityToAdjust
            });
            return { success: true, inventory: result };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    findBySku(sku) {
        return this.inventoryService.findBySku(sku);
    }
    adjustStock(id, adjustDto) {
        return this.inventoryService.adjustStock(id, adjustDto);
    }
    reserveStock(id, reserveDto) {
        return this.inventoryService.reserveStock(id, reserveDto);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reserve_stock' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "reserveStockInternal", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'adjust_stock' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "adjustStockInternal", null);
__decorate([
    (0, common_1.Get)(':sku'),
    __param(0, (0, common_1.Param)('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findBySku", null);
__decorate([
    (0, common_1.Patch)(':id/adjust'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.AdjustInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "adjustStock", null);
__decorate([
    (0, common_1.Patch)(':id/reserve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.ReserveInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "reserveStock", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map