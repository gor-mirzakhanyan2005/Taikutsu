using Microsoft.AspNetCore.Mvc;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Controllers are workin'.");
        }
    }
}
