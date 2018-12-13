using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace EventManagement_Api.Models
{
   public class Product
    {
       [Key]
       public int ProductId { get; set; }

       [ForeignKey("Catagory")]
       public int CatagoryId { get; set; }
       public string ProductName { get; set; }
       public string PictureFile { get; set; }
       public string Picture { get; set; }
       public int ProductCost { get; set; }
       public virtual Catagory Catagory { get; set; }
    }
}
