using ECommerceAPI.Data;
using ECommerceAPI.DTOs;
using ECommerceAPI.Helpers;
using ECommerceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly JwtHelper _jwt;

    public AuthController(AppDbContext context, JwtHelper jwt)
    {
        _context = context;
        _jwt = jwt;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.FullName))
                return BadRequest(new { message = "Ad soyad boş ola bilməz." });

            if (string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { message = "Email boş ola bilməz." });

            if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
                return BadRequest(new { message = "Şifrə ən azı 6 simvol olmalıdır." });

            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { message = "Bu email artıq mövcuddur." });

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            var response = new AuthResponseDto
            {
                Token = _jwt.GenerateToken(user),
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Qeydiyyat prosesində xəta baş verdi.", error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest(new { message = "Email və şifrə gereklidir." });

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Email və ya şifrə yanlışdır." });

            var response = new AuthResponseDto
            {
                Token = _jwt.GenerateToken(user),
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role
            };
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Giriş prosesində xəta baş verdi.", error = ex.Message });
        }
    }
}