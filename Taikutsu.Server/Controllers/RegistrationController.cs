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

        //Метод для створення токену JWT
        private string GenerateJwtToken(string userId)
        {
            //Створення масиву з claims
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
            };

            //Створення симетричного ключа
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
            );

            //Створення підпису
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //Створення самого токену
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            //Метод повертає токен
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegisterRequest request)
        {

            //Валідація
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password)) {
                return BadRequest("Username and password required");
            }

            //З'єднання до БД
            var connString = _configuration.GetConnectionString("DiplomaWorkDB");

            await using var connection = new NpgsqlConnection(connString);
            await connection.OpenAsync();

            //Команда для перевірки
            var checkUsername = new NpgsqlCommand("select count(*) from public.users where username = @username", 
                connection);

            //Параметри команди
            checkUsername.Parameters.AddWithValue("username", request.Username);

            //Повертаємо кількість строк, які співпадають з умовами команди
            var exists = (long)await checkUsername.ExecuteScalarAsync();

            //Якщо є більше ніж 0 строк зі співпадаючими даними
            if(exists > 0)
            {
                //Повертаємо 400
                return BadRequest("Username already registered");
            }

            //Хешування паролю
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            //Змінна з командою для створення нового користувача в БД
            var insertUserCmd = new NpgsqlCommand(
                @"insert into public.users (userid, username, passwordhash, regisdate) 
                values (@UserId, @UserName, @PasswordHash, @RegisDate)",
                connection
            );

            //Створення нового ідентифікатору для користувача
            var userId = $"user_{Guid.NewGuid()}";

            //Додавання значень до відповідних параметрів команди
            insertUserCmd.Parameters.AddWithValue("UserId", userId);
            insertUserCmd.Parameters.AddWithValue("Username", request.Username);
            insertUserCmd.Parameters.AddWithValue("PasswordHash", passwordHash);
            insertUserCmd.Parameters.AddWithValue("RegisDate", DateTime.UtcNow);

            //Асинхронне виконання команди
            await insertUserCmd.ExecuteNonQueryAsync();

            //Створення токену в відповідній змінні
            var jwtToken = GenerateJwtToken(userId.ToString());

            //Додавання даних до файлів cookies
            Response.Cookies.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(2)
            });

            return Ok();
        }
    }
}
