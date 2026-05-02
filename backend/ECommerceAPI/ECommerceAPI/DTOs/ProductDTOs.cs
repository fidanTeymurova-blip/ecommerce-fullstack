namespace ECommerceAPI.DTOs;

public record ProductResponseDto(
    int Id, string Name, string? Description,
    decimal Price, int Stock, string? ImageUrl,
    int CategoryId, string CategoryName);

public record CreateProductDto(
    string Name, string? Description, decimal Price,
    int Stock, string? ImageUrl, int CategoryId);