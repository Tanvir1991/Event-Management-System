namespace EventManagement_Api.Migrations
{
    using EventManagement_Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EventManagement_Api.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EventManagement_Api.Models.ApplicationDbContext context)
        {

            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            if (!context.Users.Any(u => u.UserName == "rkrazu2012@gmail.com"))
            {
                var user = new ApplicationUser { UserName = "rkrazu2012@gmail.com", PhoneNumber = "01991660332", Email = "rkrazu2012@gmail.com" };
                var result = userManager.Create(user, "@R660332r");

            }

            var Cat = new List<Catagory>
                {
                new Catagory{CatagoryName ="Food"},
                new Catagory{CatagoryName="Room Dacor"},
                new Catagory{CatagoryName="Light"},
                new Catagory{CatagoryName ="Stage"},
                new Catagory{CatagoryName="Sound System"},
                new Catagory{CatagoryName="Flower"},
                };
            Cat.ForEach(s => context.Catagory.Add(s));
            context.SaveChanges();

            var Evt = new List<Event>
                {
                new Event{EventName="Marriage"},
                new Event{EventName ="BirthDay Party"},
                new Event{EventName="Anniversary"},
                new Event{EventName="Corporate Party"},
                new Event{EventName ="College Party"}
                };
            Evt.ForEach(s => context.Event.Add(s));
            context.SaveChanges();

            var Bkd = new List<BookingDetails>
                {
                new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="12", ProductCost=2650 ,ProductName="abc", Catagory="Food" },
                     new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="33", ProductCost=4250 ,ProductName="def", Catagory="Room" },
                     new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="7", ProductCost=2750 ,ProductName="gfd", Catagory="Light" },
                     new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="42", ProductCost=3350 ,ProductName="rty", Catagory="Flower" },
                     new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="27", ProductCost=2500 ,ProductName="cvx", Catagory="Sound System" },
                     new BookingDetails{  BookingDate=DateTime.Parse("1-1-2018") ,  ContactNo="lkh", Email="r@r.com", GuestNo=450,EventId=1,EventDate="1", TransactionId="145445856556", Address="Dhaka",Quantity=1 ,TotalCost=125400, CustomerName="abc",
                    ProductId="11", ProductCost=1150 ,ProductName="ert", Catagory="Stage" }
                };
            Bkd.ForEach(s => context.BookingDetails.Add(s));
            context.SaveChanges();

        }
    }
}
