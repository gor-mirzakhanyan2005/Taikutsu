using Microsoft.EntityFrameworkCore;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<TokenModel> RefreshTokens { get; set; }
    }
}
