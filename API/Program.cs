// Add services to the container.

using System.Text;
using API.Admin.Services;
using API.Data;
using API.Entities;
using API.Mapping;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(opt =>
{
   opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultCS")); 
});

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddCors();

builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(opt =>
   {
         opt.TokenValidationParameters = new TokenValidationParameters
         {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
            ValidateIssuer = false,
            ValidateAudience = false     
         };
   });

builder.Services.Configure<PhotoSettings>(builder.Configuration.GetSection("PhotoSettings"));


// Configure the HTTP request pipeline.
var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200","https://localhost:4200"));

// Serve uploaded files from /uploads
var uploadsPath = Path.Combine(builder.Environment.ContentRootPath, "uploads/admin");
if (!Directory.Exists(uploadsPath))
   Directory.CreateDirectory(uploadsPath);

app.UseStaticFiles(new StaticFileOptions
{
   FileProvider = new PhysicalFileProvider(uploadsPath),
   RequestPath = "/uploads/admin"
});

// app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
