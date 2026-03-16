using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PreferenceController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PreferenceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get() {
            return Ok("This controller is working.");
        }

        [HttpPost("update")]
        public async Task<IActionResult> Post([FromBody] PreferenceRequest request)
        {
            string query = 
             @"insert into userpreferences (useremail, category, score)
                values(@useremail, @category, 1)
                on conflict do update
                set score = userpreferences.score + 1";

            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            try
            {
                await using var connection = new NpgsqlConnection(connectionString);
                await connection.OpenAsync();

                foreach(var category in request.Category)
                {

                }
            } catch
            {

            }
        }
    }
}
