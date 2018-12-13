using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using EventManagement_Api.Models;
using System.Web.Http.Cors;

namespace EventManagement_Api.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using EventManagement_Api.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<BookingDetails>("BookingDetails");
    builder.EntitySet<Product>("Product"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [EnableCors("*", "*", "*")]
   
    public class BookingDetailsController : ODataController
    {
        private EventManagement_Api.Models.ApplicationDbContext db = new EventManagement_Api.Models.ApplicationDbContext();

        // GET: odata/BookingDetails
        [EnableQuery]
        public IQueryable<BookingDetails> GetBookingDetails()
        {
            return db.BookingDetails;
        }

        // GET: odata/BookingDetails(5)
        [EnableQuery]
        public SingleResult<BookingDetails> GetBookingDetails([FromODataUri] int key)
        {
            return SingleResult.Create(db.BookingDetails.Where(bookingDetails => bookingDetails.BookingID == key));
        }

        // PUT: odata/BookingDetails(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<BookingDetails> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BookingDetails bookingDetails = db.BookingDetails.Find(key);
            if (bookingDetails == null)
            {
                return NotFound();
            }

            patch.Put(bookingDetails);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(bookingDetails);
        }

        // POST: odata/BookingDetails
        public IHttpActionResult Post(BookingDetails bookingDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {

            
            db.BookingDetails.Add(bookingDetails);
            db.SaveChanges();
                }
            catch(Exception ex)
            {
                string s = ex.InnerException.ToString();
                return BadRequest(s);
            }
            return Created(bookingDetails);
        }

        // PATCH: odata/BookingDetails(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<BookingDetails> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            BookingDetails bookingDetails = db.BookingDetails.Find(key);
            if (bookingDetails == null)
            {
                return NotFound();
            }

            patch.Patch(bookingDetails);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailsExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(bookingDetails);
        }

        // DELETE: odata/BookingDetails(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            BookingDetails bookingDetails = db.BookingDetails.Find(key);
            if (bookingDetails == null)
            {
                return NotFound();
            }

            db.BookingDetails.Remove(bookingDetails);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/BookingDetails(5)/Product
        [EnableQuery]
        public IQueryable<Product> GetProduct([FromODataUri] int key)
        {
            return db.BookingDetails.Where(m => m.BookingID == key).SelectMany(m => m.Product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingDetailsExists(int key)
        {
            return db.BookingDetails.Count(e => e.BookingID == key) > 0;
        }

        [HttpPost]
        public IHttpActionResult EventBookings(ODataActionParameters parameters)
        {
            var bookings = parameters["evts"] as IEnumerable<BookingVM>;
           

            foreach (var bk in bookings)
            {
                db.BookingDetails.Add(new BookingDetails { 
                     Address= bk.Address,
                      BookingDate= bk.BookingDate,
                       Catagory=bk.Catagory,
                        ContactNo=bk.ContactNo,
                         CustomerName=bk.CustomerName,
                          Email=bk.Email,
                            EventDate=bk.EventDate,
                             GuestNo=bk.GuestNo,
                              ProductCost=bk.ProductCost,
                               EventId=bk.EventId,
                                ProductName=bk.ProductName,
                                 ProductId=bk.ProductId,
                                  Quantity=bk.Quantity,
                                   TotalCost=bk.TotalCost,
                                   TransactionId=bk.TransactionId
            });
            }
            db.SaveChanges();
          
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPost]
        [EnableQuery]
        public IQueryable<BookingDetails> GetProduct()
        {
            return db.BookingDetails.Distinct();
        }
    }

}
