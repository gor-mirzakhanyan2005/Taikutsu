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

        [HttpPost("update")]
        public async Task<IActionResult> Post([FromBody] PreferenceRequest request)
        {
            //Перевірка на наявність запиту
            if (request == null)
                return BadRequest("Request is null");

            //Перевірка на наявність ідентифікатору та категорії
            if (request.Id == null || request.Category == null)
            {
                return BadRequest("ID or category are null");
            }

            //Ключ з'єднання до БД
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            //Спроба відновити дані про уподобання
            try
            {
                //Створення з'єднання
                await using var connection = new NpgsqlConnection(connectionString);
                //Відкриття з'єднання
                await connection.OpenAsync();

                //Запит для відновлення даних про уподобання, повертає score
                var updatePreference = new NpgsqlCommand(
                    @"insert into public.userpreferences(userid, category)
                    values(@userid, @category)
                    on conflict (userid, category)
                    do update set score = userpreferences.score + 1
                    returning score", connection);

                //Додавання параметрів ідентифікатору та категорії
                updatePreference.Parameters.AddWithValue("userid", request.Id);
                updatePreference.Parameters.AddWithValue("category", request.Category);

                //Бали для категорії, отримуються через виконання запиту
                var score = (int)await updatePreference.ExecuteScalarAsync();

                //Повертаємо дані
                return Ok(new
                {
                    Id = request.Id,
                    Category = request.Category,
                    Score = score
                });
            } catch (Exception ex)
            {
                //При невдалому виконанні алгоритму, відправляємо повідомлення з кодом 500
                return StatusCode(500, ex.Message);
            }
        }
    }
}
