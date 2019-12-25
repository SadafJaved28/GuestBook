using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuestBookApi.Models;

namespace GuestBookApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestBooksController : ControllerBase
    {
        private readonly GuestBookContext _context;

        public GuestBooksController(GuestBookContext context)
        {
            _context = context;
        }

        // GET: api/GuestBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GuestBook>>> GetguestBooks()
        {
            return await _context.guestBooks.ToListAsync();
        }

        // GET: api/GuestBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GuestBook>> GetGuestBook(long id)
        {
            var guestBook = await _context.guestBooks.FindAsync(id);

            if (guestBook == null)
            {
                return NotFound();
            }

            return guestBook;
        }

        // PUT: api/GuestBooks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGuestBook(long id, GuestBook guestBook)
        {
            if (id != guestBook.Id)
            {
                return BadRequest();
            }

            _context.Entry(guestBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GuestBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GuestBooks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<GuestBook>> PostGuestBook(GuestBook guestBook)
        {
            _context.guestBooks.Add(guestBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGuestBook", new { id = guestBook.Id }, guestBook);
        }

        // DELETE: api/GuestBooks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GuestBook>> DeleteGuestBook(long id)
        {
            var guestBook = await _context.guestBooks.FindAsync(id);
            if (guestBook == null)
            {
                return NotFound();
            }

            _context.guestBooks.Remove(guestBook);
            await _context.SaveChangesAsync();

            return guestBook;
        }

        private bool GuestBookExists(long id)
        {
            return _context.guestBooks.Any(e => e.Id == id);
        }
    }
}
