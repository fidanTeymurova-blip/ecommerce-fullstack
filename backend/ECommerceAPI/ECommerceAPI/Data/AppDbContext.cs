using ECommerceAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Product>().Property(p => p.Price).HasPrecision(10, 2);
        modelBuilder.Entity<Order>().Property(o => o.TotalAmount).HasPrecision(10, 2);
        modelBuilder.Entity<OrderItem>().Property(o => o.UnitPrice).HasPrecision(10, 2);

        // Seed data
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Elektronika" },
            new Category { Id = 2, Name = "Geyim" },
            new Category { Id = 3, Name = "Kitab" },
            new Category { Id = 4, Name = "Ev əşyaları" }
        );

        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "iPhone 15", Description = "Apple iPhone 15 128GB", Price = 1299, Stock = 10, CategoryId = 1, ImageUrl = "https://placehold.co/300x300?text=iPhone15" },
            new Product { Id = 2, Name = "Samsung Galaxy S24", Description = "Samsung Galaxy S24 256GB", Price = 999, Stock = 15, CategoryId = 1, ImageUrl = "https://placehold.co/300x300?text=Samsung" },
            new Product { Id = 3, Name = "MacBook Air M2", Description = "Apple MacBook Air 13 inch", Price = 1899, Stock = 5, CategoryId = 1, ImageUrl = "https://placehold.co/300x300?text=MacBook" },
            new Product { Id = 4, Name = "Kişi köynəyi", Description = "Premium pambıq köynək", Price = 45, Stock = 50, CategoryId = 2, ImageUrl = "https://placehold.co/300x300?text=Shirt" },
            new Product { Id = 5, Name = "Clean Code", Description = "Robert C. Martin kitabı", Price = 35, Stock = 20, CategoryId = 3, ImageUrl = "https://placehold.co/300x300?text=Book" },
            new Product { Id = 6, Name = "Qahvə dəsti", Description = "6 nəfərlik qahvə dəsti", Price = 89, Stock = 8, CategoryId = 4, ImageUrl = "https://placehold.co/300x300?text=Coffee" }
        );
    }
}