using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using EventManagement_Api.Models;

namespace EventManagement_Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<BookingDetails>("BookingDetails");
            builder.EntitySet<Product>("Products");
            builder.EntitySet<Catagory>("Catagories");
            builder.EntitySet<Event>("Events");
            builder.Entity<Product>().Collection.Action("GetCatagory").ReturnsCollection<ProductVM>();



            var ConfirmBooking = builder.Entity<BookingDetails>().Collection.Action("EventBookings").Returns<bool>();
            ConfirmBooking.CollectionParameter<BookingVM>("evts");

            var distinctBooking = builder.Entity<BookingDetails>().Collection.Action("GetProduct").ReturnsFromEntitySet<BookingDetails>("BookingDetails");
            //ConfirmBooking.CollectionParameter<BookingDetails>("evts");

            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}
