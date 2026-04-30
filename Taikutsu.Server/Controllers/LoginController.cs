using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string GenerateJwtToken(string userId)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if(string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Username and password required");
            }

            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            await using var connection = new NpgsqlConnection(connString);
            await connection.OpenAsync();

            var checkUser = new NpgsqlCommand("select userid, username, passwordhash, userpreferences, regisdate from public.users where username = @username", connection);
            checkUser.Parameters.AddWithValue("username", request.Username);

            await using var reader = await checkUser.ExecuteReaderAsync();

            if(!await reader.ReadAsync())
            {
                return BadRequest("No such user!");
            }

            var userId = reader.GetString(0);
            var username = reader.GetString(1);
            var passwordHash = reader.GetString(2);
            var userpreferences = reader.GetFieldValue<string[]>(3);
            var regisdate = reader.GetDateTime(4);

            if (!BCrypt.Net.BCrypt.Verify(request.Password, passwordHash))
            {
                return BadRequest("Incorrect password.");
            }

            var jwtToken = GenerateJwtToken(userId);

            Response.Cookies.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok(new
            {
                userId = userId,
                token = jwtToken,
                username = username,
                userpreferences = userpreferences,
                regisdate = regisdate
            });
            
        }
    }
}
