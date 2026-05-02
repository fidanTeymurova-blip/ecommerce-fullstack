using System.Security.Claims;
using ECommerceAPI.Data;
using ECommerceAPI.DTOs;
using ECommerceAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;
    public OrdersController(AppDbContext context) => _context = context;

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetMyOrders()
    {
        var orders = await _context.Orders
            .Where(o => o.UserId == GetUserId())
            .Include(o => o.Items).ThenInclude(i => i.Product)
            .Select(o => new OrderResponseDto(
                o.Id, o.CreatedAt, o.Status, o.TotalAmount, o.Address,
                o.Items.Select(i => new OrderItemResponseDto(
                    i.ProductId, i.Product.Name, i.Quantity, i.UnitPrice
                )).ToList()
            )).ToListAsync();
        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
    {
        if (dto.Items == null || dto.Items.Count == 0)
            return BadRequest("Sifariş boş ola bilməz.");

        var productIds = dto.Items.Select(i => i.ProductId).ToList();
        var products = await _context.Products
            .Where(p => productIds.Contains(p.Id) && p.IsActive)
            .ToListAsync();

        if (products.Count != dto.Items.Count)
            return BadRequest("Bəzi məhsullar tapılmadı.");

        var order = new Order
        {
            UserId = GetUserId(),
            Address = dto.Address,
            Items = dto.Items.Select(i =>
            {
                var product = products.First(p => p.Id == i.ProductId);
                return new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = product.Price
                };
            }).ToList()
        };

        order.TotalAmount = order.Items.Sum(i => i.Quantity * i.UnitPrice);
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return Ok(new { order.Id, order.TotalAmount, order.Status });
    }
}