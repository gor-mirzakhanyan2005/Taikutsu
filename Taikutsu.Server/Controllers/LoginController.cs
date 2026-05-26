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
        
        [HttpPost]
        //Метод для авторизації користувача
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
<<<<<<< HEAD
            //Перевірка даних із запиту, відправленого користувачем
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
=======
            if(string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            {
                return BadRequest("Username and password required");
            }

            //Ключ для з'єднання 
            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            //Створення самого з'єднання
            await using var connection = new NpgsqlConnection(connString);
            //Його відкриття
            await connection.OpenAsync();

<<<<<<< HEAD
            //Команда для перевірки даних про користувача через select & where
            var checkUser = new NpgsqlCommand("select userid, username, passwordhash, userpreferences, regisdate " +
                "from public.users where username = @username", connection);
            //Додавання параметрів до команди
=======
            var checkUser = new NpgsqlCommand("select userid, username, passwordhash, userpreferences, regisdate from public.users where username = @username", connection);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            checkUser.Parameters.AddWithValue("username", request.Username);

            //Переривання виконання асинхронного методу, доки не буде виконана команда
            await using var reader = await checkUser.ExecuteReaderAsync();

            // Якщо запит не повернув жодного рядка, користувач із вказаним іменем не існує
            if (!await reader.ReadAsync())
            {
                return BadRequest("No such user!");
            }

<<<<<<< HEAD
            //Створюємо змінні для зчитування даних про користувача
=======
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            var userId = reader.GetString(0);
            var username = reader.GetString(1);
            var passwordHash = reader.GetString(2);
            var userpreferences = reader.GetFieldValue<string[]>(3);
            var regisdate = reader.GetDateTime(4);

            //Перевірка паролю через BCrypt.Verify
            if (!BCrypt.Net.BCrypt.Verify(request.Password, passwordHash))
            {
                return BadRequest("Incorrect password.");
            }

<<<<<<< HEAD
            //Створення токену JWT
=======
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            var jwtToken = GenerateJwtToken(userId);

            //Додавання токену до cookies
            Response.Cookies.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(2)
            });

<<<<<<< HEAD
            return Ok();
=======
            return Ok(new
            {
                userId = userId,
                token = jwtToken,
                username = username,
                userpreferences = userpreferences,
                regisdate = regisdate
            });
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            
        }
    }
}
