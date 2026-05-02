using ECommerceAPI.Models;

namespace ECommerceAPI.DTOs;

public record OrderItemDto(int ProductId, int Quantity);
public record CreateOrderDto(List<OrderItemDto> Items, string? Address);

public record OrderResponseDto(
    int Id, DateTime CreatedAt, OrderStatus Status,
    decimal TotalAmount, string? Address,
    List<OrderItemResponseDto> Items);

public record OrderItemResponseDto(
    int ProductId, string ProductName,
    int Quantity, decimal UnitPrice);