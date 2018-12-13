using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EventManagement_Api.Models
{
    public class ProductVM
    {
        public int ProductId { get; set; }

   
        public string  Catagory { get; set; }
        public string ProductName { get; set; }
        public string PictureFile { get; set; }
        public string Picture { get; set; }
        public int ProductCost { get; set; }
      
    }
}