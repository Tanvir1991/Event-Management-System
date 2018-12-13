using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace EventManagement_Api.Models
{
   public class BookingDetails
    {
        [Key]
        public int BookingID { get; set; }
       [DataType(DataType.Date)]
       //[Column(TypeName = "datetime2")]
      
        public DateTime BookingDate { get; set; }
       
        public string EventDate { get; set; }

        [ForeignKey("Event")]
        public int EventId { get; set; }
        public int GuestNo { get; set; }   
        public string Catagory	 { get; set; }

        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public string ProductName	 { get; set; }


        public int Quantity	 { get; set; }
        public int  ProductCost { get; set; }
        public int TotalCost { get; set; }
        public string CustomerName { get; set; }
        public string ContactNo { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }

        public string TransactionId { get; set; }

        public virtual ICollection<Product> Product { get; set; }
        public virtual ICollection<Event> Event { get; set; }
    }
}
