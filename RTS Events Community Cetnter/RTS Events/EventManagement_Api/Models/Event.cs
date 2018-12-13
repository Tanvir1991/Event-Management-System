using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace EventManagement_Api.Models
{
   public class Event
    {
       [Key]
       public int EventId { get; set; }
       public string EventName { get; set; }
    }
}
