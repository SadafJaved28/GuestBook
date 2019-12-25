using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuestBookApi.Models
{
    public class GuestBook
    {
        public GuestBook()
        {
            CreatedDate = DateTime.Now.ToString("MM/dd/yyyy hh:mm tt");
        }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public string CreatedDate { get; set; }
    }
}
