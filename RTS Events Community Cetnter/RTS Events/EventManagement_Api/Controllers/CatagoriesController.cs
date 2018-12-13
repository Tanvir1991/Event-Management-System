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
    builder.EntitySet<Catagory>("Catagories");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    [EnableCors("*", "*", "*")]
    
    public class CatagoriesController : ODataController
    {
        private EventManagement_Api.Models.ApplicationDbContext db = new EventManagement_Api.Models.ApplicationDbContext();

        // GET: odata/Catagories
        [EnableQuery]
        public IQueryable<Catagory> GetCatagories()
        {
            return db.Catagory;
        }

        // GET: odata/Catagories(5)
        [EnableQuery]
        public SingleResult<Catagory> GetCatagory([FromODataUri] int key)
        {
            return SingleResult.Create(db.Catagory.Where(catagory => catagory.CatagoryId == key));
        }

        // PUT: odata/Catagories(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Catagory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Catagory catagory = db.Catagory.Find(key);
            if (catagory == null)
            {
                return NotFound();
            }

            patch.Put(catagory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatagoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(catagory);
        }

        // POST: odata/Catagories

     [Authorize]
        public IHttpActionResult Post(Catagory catagory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Catagory.Add(catagory);
            db.SaveChanges();

            return Created(catagory);
        }

        // PATCH: odata/Catagories(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Catagory> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Catagory catagory = db.Catagory.Find(key);
            if (catagory == null)
            {
                return NotFound();
            }

            patch.Patch(catagory);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatagoryExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(catagory);
        }

        // DELETE: odata/Catagories(5)
        [Authorize]
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Catagory catagory = db.Catagory.Find(key);
            if (catagory == null)
            {
                return NotFound();
            }

            db.Catagory.Remove(catagory);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CatagoryExists(int key)
        {
            return db.Catagory.Count(e => e.CatagoryId == key) > 0;
        }
    }
}
