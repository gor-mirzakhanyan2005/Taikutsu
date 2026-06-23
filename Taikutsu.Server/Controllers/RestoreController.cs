using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Taikutsu.Server.Controllers
{
    [Route("api/restore")]
    [ApiController]
    public class RestoreController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RestoreController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok();
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var jwt = Request.Cookies["jwt"];
            if (jwt == null) return Unauthorized();

            try
            {
                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                var tokenHandler = new JwtSecurityTokenHandler();
                var principal = tokenHandler.ValidateToken(jwt, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ValidateLifetime = true
                }, out _);

                var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

                var connString = _configuration.GetConnectionString("DiplomaWorkDB");
                await using var connection = new NpgsqlConnection(connString);
                await connection.OpenAsync();

                var cmd = new NpgsqlCommand(
                    "select userid, username, userpreferences from public.users where userid = @userid", connection);
                cmd.Parameters.AddWithValue("userid", userId);

                await using var reader = await cmd.ExecuteReaderAsync();
                if (!await reader.ReadAsync()) return Unauthorized();

                return Ok(new
                {
                    userId = reader.GetString(0),
                    username = reader.GetString(1),
                    userpreferences = reader.IsDBNull(2) ? Array.Empty<string>() : reader.GetFieldValue<string[]>(2)
                });
            }
            catch
            {
                return Unauthorized();
            }
        }
    }
}
