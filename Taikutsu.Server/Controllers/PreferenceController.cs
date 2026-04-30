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
            if (request == null)
                return BadRequest("Request is null");

            if(request.Id == null || request.Category == null)
            {
                return BadRequest("ID or category are null");
            }
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            try
            {
                await using var connection = new NpgsqlConnection(connectionString);
                await connection.OpenAsync();

                var updatePreference = new NpgsqlCommand(
                    @"insert into public.userpreferences(userid, category)
                    values(@userid, @category)
                    on conflict (userid, category)
                    do update set score = userpreferences.score + 1
                    returning score", connection);

                updatePreference.Parameters.AddWithValue("userid", request.Id);
                updatePreference.Parameters.AddWithValue("category", request.Category);

                var score = (int)await updatePreference.ExecuteScalarAsync();

                return Ok(new
                {
                    Id = request.Id,
                    Category = request.Category,
                    Score = score
                });
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
