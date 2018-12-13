using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EventManagement_Api.Models
{
    public class Catagory
    {
        [Key]
        public int CatagoryId { get; set; }
        public string CatagoryName { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}