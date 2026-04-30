using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Authorize]
    [Route("api/category")]
    [ApiController]
    [Produces("application/json")]

    public class CategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryConfirmRequest request)
        {
            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            await using var connection = new NpgsqlConnection(connString);
            await connection.OpenAsync();

            var insertCategories = new NpgsqlCommand("update users set userpreferences = @userpreferences where userid = @userid returning userid, userpreferences", connection);
            insertCategories.Parameters.AddWithValue("userpreferences", request.categories);
            insertCategories.Parameters.AddWithValue("userid", request.userid);

            await using var reader = await insertCategories.ExecuteReaderAsync();

            if(!await reader.ReadAsync())
            {
                return BadRequest("No such user!");
            }

            var userid = reader.GetFieldValue<string>(0);
            var categories = reader.GetFieldValue<string[]>(1);

            return Ok(new
            {
                userid = userid,
                categories = categories
            });
        }
    }
}
