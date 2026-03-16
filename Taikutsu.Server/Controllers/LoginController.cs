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

        private string GenerateJwtToken(Guid userId, string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, email)
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
            if(string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password required");
            }

            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            await using var connection = new NpgsqlConnection(connString);
            await connection.OpenAsync();

            var checkUser = new NpgsqlCommand("select userid, username, email, passwordhash, userpreferences, regisdate from public.users where email = @email", connection);
            checkUser.Parameters.AddWithValue("email", request.Email);

            await using var reader = await checkUser.ExecuteReaderAsync();

            if(!await reader.ReadAsync())
            {
                return BadRequest("No such user!");
            }

            var userId = reader.GetGuid(0);
            var username = reader.GetString(1);
            var email = reader.GetString(2);
            var passwordHash = reader.GetString(3);
            var userpreferences = reader.GetFieldValue<string[]>(4);
            var regisdate = reader.GetDateTime(5);

            if (!BCrypt.Net.BCrypt.Verify(request.Password, passwordHash))
            {
                return BadRequest("Incorrect password.");
            }

            var jwtToken = GenerateJwtToken(userId, email);

            Response.Cookies.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok(new
            {
                token = jwtToken,
                email = email,
                username = username,
                userpreferences = userpreferences,
                regisdate = regisdate
            });
            
        }
    }
}
