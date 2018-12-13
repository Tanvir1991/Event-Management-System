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
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Http.Cors;

namespace EventManagement_Api.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using EventManagement_Api.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Product>("Products");
    builder.EntitySet<Catagory>("Catagory"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
     [EnableCors("*", "*", "*")]
    
    public class ProductsController : ODataController
    {
         private EventManagement_Api.Models.ApplicationDbContext db = new EventManagement_Api.Models.ApplicationDbContext();

        // GET: odata/Products
        [EnableQuery]
        public IQueryable<Product> GetProducts()
        {
            return db.Product;
        }

        // GET: odata/Products(5)
        [EnableQuery]
        public SingleResult<Product> GetProduct([FromODataUri] int key)
        {
            return SingleResult.Create(db.Product.Where(product => product.ProductId == key));
        }

        // PUT: odata/Products(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Product> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product product = db.Product.Find(key);
            if (product == null)
            {
                return NotFound();
            }

            patch.Put(product);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(product);
        }

        // POST: odata/Products
         [Authorize]
        public IHttpActionResult Post(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string f = System.Web.HttpContext.Current.Server.MapPath("~/Content/img/") + System.Guid.NewGuid() + ".jpg";
            var s = product.Picture.Split(',').ToList<string>();
            using (Image image = Image.FromStream(new MemoryStream(Convert.FromBase64String(s[1]))))
            {
                image.Save(f, ImageFormat.Jpeg);  // Or Png
            }
            product.Picture = "";
            product.PictureFile = Path.GetFileName(f);
            db.Product.Add(product);
            db.SaveChanges();

            return Created(product);
        }

        // PATCH: odata/Products(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Product> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Product product = db.Product.Find(key);
            if (product == null)
            {
                return NotFound();
            }

            patch.Patch(product);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(product);
        }

        // DELETE: odata/Products(5)
         [Authorize]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Product product = db.Product.Find(key);
            if (product == null)
            {
                return NotFound();
            }

            db.Product.Remove(product);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        //// GET: odata/Products(5)/Catagory
        //[EnableQuery]
        //public IQueryable<Catagory> GetCatagory([FromODataUri] int key)
        //{
        //    return db.Product.Where(m => m.ProductId == key).SelectMany(m => m.Catagory);
        //}
        //[EnableQuery]
         [HttpPost]
        public IQueryable<ProductVM> GetCatagory()
        {
            return db.Product.Include(c=>c.Catagory).Select(m =>
                new ProductVM
                {
                    ProductId=m.ProductId,
                    Catagory =m.Catagory.CatagoryName,
                    Picture=m.Picture,
                     PictureFile=m.PictureFile,
                      ProductCost=m.ProductCost,
                        ProductName=m.ProductName

                }
                );
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int key)
        {
            return db.Product.Count(e => e.ProductId == key) > 0;
        }
    }
}
