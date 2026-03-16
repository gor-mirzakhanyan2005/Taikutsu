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
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegistrationController(IConfiguration configuration)
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
        public async Task<IActionResult> Get() {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegisterRequest request)
        {

            //Валідація
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password)) {
                return BadRequest("Email and password required");
            }

            //З'єднання до БД
            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            await using var connection = new NpgsqlConnection(connString);
            await connection.OpenAsync();

            //Команда для перевірки
            var checkEmail = new NpgsqlCommand("select count(*) from public.users where email = @email or username = @username", connection);

            //Параметри команди
            checkEmail.Parameters.AddWithValue("username", request.Username);
            checkEmail.Parameters.AddWithValue("email", request.Email);

            //Повертаємо кількість строк, які співпадають з умовами команди
            var exists = (long)await checkEmail.ExecuteScalarAsync();

            //Якщо є більше ніж 0 строк зі співпадаючими даними
            if(exists > 0)
            {
                //Повертаємо 400
                return BadRequest("Email or username already registered");
            }

            //Хешування паролю
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var insertUserCmd = new NpgsqlCommand(
                "insert into public.users (userid, username, email, passwordhash, regisdate) values (@UserId, @UserName, @Email, @PasswordHash, @RegisDate)",
                connection
            );

            var userId = Guid.NewGuid();

            insertUserCmd.Parameters.AddWithValue("UserId", userId);
            insertUserCmd.Parameters.AddWithValue("Username", request.Username);
            insertUserCmd.Parameters.AddWithValue("Email", request.Email);
            insertUserCmd.Parameters.AddWithValue("PasswordHash", passwordHash);
            insertUserCmd.Parameters.AddWithValue("RegisDate", DateTime.UtcNow);

            await insertUserCmd.ExecuteNonQueryAsync();

            var jwtToken = GenerateJwtToken(userId, request.Email);

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
                username = request.Username,
                email = request.Email,
                token = jwtToken
            });
        }
    }
}
