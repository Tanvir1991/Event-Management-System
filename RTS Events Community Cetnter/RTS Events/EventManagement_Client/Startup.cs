using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EventManagement_Client.Startup))]
namespace EventManagement_Client
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
