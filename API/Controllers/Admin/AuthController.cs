using System.Security.Cryptography;
using System.Text;
using API.Admin.Services;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Admin.Controllers;

[ApiController]
[Route("/api/admin/[controller]")]
public class AuthController : ControllerBase
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AuthController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == loginDto.Username.ToLower());
        
        if (user == null) return Unauthorized("Invalid username.");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for(int i=0; i < computeHash.Length; i++)
        {
            if(computeHash[i] != user.PasswordHash[i]) 
                return Unauthorized("Invalid password.");
        }

        return new LoginResponseDto
        {
            Username = user.Username,
            Token =  _tokenService.CreateToken(user)
        };
    }    

    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username == username.ToLower());
    }

    [HttpPost("register")]
    public async Task<ActionResult<RegisterResponseDto>> Register(RegisterRequestDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken.");

        using var hmac = new HMACSHA512();
        
        var user = new User
        {
            Username = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
            RoleId = 1
        };

        _context.Add(user);
        await _context.SaveChangesAsync();

        return new RegisterResponseDto
        {
            Username = user.Username
        };
    }

}
