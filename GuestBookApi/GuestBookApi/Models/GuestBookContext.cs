using Microsoft.EntityFrameworkCore;

namespace GuestBookApi.Models
{
    public class GuestBookContext : DbContext
    {
        public GuestBookContext(DbContextOptions<GuestBookContext> options) : base(options)
        {
        }

        public DbSet<GuestBook> guestBooks { get; set; }
    }
}
