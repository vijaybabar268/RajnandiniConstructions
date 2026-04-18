using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Site> Sites { get; set; }
}
