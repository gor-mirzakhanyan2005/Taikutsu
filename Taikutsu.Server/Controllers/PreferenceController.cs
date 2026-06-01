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
            Console.WriteLine($"Category received: '{request.Category}'");
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
                    @"insert into public.userpreferences(userid, category, score)
                    values(@userid, @category, @weight)
                    on conflict (userid, category)
                    do update set score = userpreferences.score + @weight
                    returning score", connection);

                //Додавання параметрів ідентифікатору та категорії
                updatePreference.Parameters.AddWithValue("userid", request.Id);
                updatePreference.Parameters.AddWithValue("category", request.Category);
                updatePreference.Parameters.AddWithValue("weight", request.Weight);

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

        [HttpPost("delete")]
        //Метод для видалення даних
        public async Task<IActionResult> Delete([FromBody] PreferenceDeletionRequest request) {
            //Перевірка на коректність запиту
            if (request == null) return BadRequest("Request is null");

            //Перевірка на наявність ідентифікатору користувача
            if (request.userId == null)
            {
                return BadRequest("userId is null");
            }

            //Ключ для з'єднання з базою даних
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            //Спроба провести процес видалення
            try
            {
                //Створення змінної зі з'єднанням
                await using var connection = new NpgsqlConnection(connectionString);
                //Відкриття з'єднання
                await connection.OpenAsync();

                //Створення самої команди для видалення даних про користувацькі уподобання
                //в таблиці userpreferences
                var deleteCmd = new NpgsqlCommand(
                    @"delete from public.userpreferences where userid = @userid", connection);
                //Додавання параметру ідентифікатора користувача до команди
                deleteCmd.Parameters.AddWithValue("userid", request.userId);
                //Зупинення виконання методу доки не буде виконана команда
                await deleteCmd.ExecuteNonQueryAsync();

                //Створення команди для видалення даних про уподобання з відповідної колони
                //з таблиці users
                var deletePreferencesCmd = new NpgsqlCommand(
                    @"update public.users set userpreferences = '{}' where userid = @userid", connection);
                deletePreferencesCmd.Parameters.AddWithValue("userid", request.userId);
                await deletePreferencesCmd.ExecuteNonQueryAsync();

                //Повертаємо Ok
                return Ok();

            }
            //Ловимо помилку та надсилаємо повідомлення з кодом 500
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("insert")]
        //Метод для синхронизації між двома таблицями
        public async Task<IActionResult> SyncPreferences([FromBody] CategoryInsertRequest request)
        {
            //Перевірки на наявність відповідних даних
            if (request == null)
                return BadRequest("Request is null");

            if (request.UserId == null)
                return BadRequest("ID is null");

            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            //Спроба вставити дані з userpreferences у відповідну колону таблиці
            //users
            try
            {
                await using var connection = new NpgsqlConnection(connectionString);
                await connection.OpenAsync();

                //Команда для синхронизації
                var syncCmd = new NpgsqlCommand(
                    @"update public.users
                      set userpreferences = (
                          select array_agg(category order by score desc)
                          from public.userpreferences
                          where userid = @userid
                      )
                      where userid = @userid",
                    connection);

                syncCmd.Parameters.AddWithValue("userid", request.UserId);
                await syncCmd.ExecuteNonQueryAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
