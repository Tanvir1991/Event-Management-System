using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventManagement_Api.Models
{
    public class BookingVM
    {
        public int BookingID { get; set; }
         public DateTime BookingDate { get; set; }

        public string EventDate { get; set; }

       
        public int EventId { get; set; }
        public int GuestNo { get; set; }
        public string Catagory { get; set; }

        
        public string ProductId { get; set; }
        public string ProductName { get; set; }


        public int Quantity { get; set; }
        public int ProductCost { get; set; }
        public int TotalCost { get; set; }
        public string CustomerName { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public string TransactionId { get; set; }
    }
}