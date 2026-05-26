using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Text.Json;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class CartController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CartController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string userId)
        {
            string query = @"select cart from carts where userid = @userid";
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            try
            {
                var products = new List<object>();

                await using var dataSource = NpgsqlDataSource.Create(connectionString);
                await using var cmd = dataSource.CreateCommand(query);
                cmd.Parameters.AddWithValue("userid", userId);

                using var reader = await cmd.ExecuteReaderAsync();

                if (await reader.ReadAsync())
                {
                    var cartJson = reader.GetString(0);
                    Console.WriteLine($"cartJson from DB: {cartJson}");
                    var cart = JsonSerializer.Deserialize<List<CartItemModel>>(cartJson, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return Ok(new GetCartModel { UserId = userId, Cart = cart });
                } else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500);
            }
        }

        [HttpPost]
        //Метод для створення кошика
        public async Task<IActionResult> Post([FromBody] CartRequestModel request)
        {
            //Спроба створити кошик
            try
            {
                //Ключ для з'єднання з БД
                var connString = _configuration.GetConnectionString("DiplomaWorkDB");

                //Саме з'єднання
                await using var connection = new NpgsqlConnection(connString);
                //Відкриття з'єднання
                await connection.OpenAsync();

                //Створення нового ідентифікатору для кошикв
                var guid = Guid.NewGuid();

<<<<<<< HEAD
                //Команда для створення кошика
                var createCart = new NpgsqlCommand("insert into public.carts (cartid, userid, cart) values (@cartid, @userid, '[]') on conflict (userid) do nothing", connection);
                //Додавання значень до параметрів команди
=======
                var createCart = new NpgsqlCommand("insert into public.carts (cartid, userid, cart) values (@cartid, @userid, '{}') on conflict (userid) do nothing", connection);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
                createCart.Parameters.AddWithValue("cartid", guid);
                createCart.Parameters.AddWithValue("userid", request.UserId);

                //Переривання роботи методу до виконання команди
                await createCart.ExecuteNonQueryAsync();

<<<<<<< HEAD
                return Ok();
=======
                return Ok(new
                {
                    CartId = guid,
                    UserId = request.UserId
                });
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        //Метод для відновлення кошика
        public async Task<IActionResult> Put([FromBody] CartUpdateRequests request)
        {
            //Спроба відновити кошик
            try
            {
                //Створення ключа для з'єднання до БД
                var connString = _configuration.GetConnectionString("DiplomaWorkDB");

                //Створення самого з'єднання
                await using var connection = new NpgsqlConnection(connString);
                //Його відкриття
                await connection.OpenAsync();

                //Серіалізація об'єкту, який надсилає клієнт, у формат JSON
                var jsonCart = JsonSerializer.Serialize(request.Cart);

<<<<<<< HEAD
                //Команда адля відновлення кошика
                var updateCart = new NpgsqlCommand(
                    "update carts set cart = @cart where userid = @userid",
                    connection);

                //Додавання параметрів до команди
=======
                var updateCart = new NpgsqlCommand("update carts set cart = @cart where userid = @userid", connection);
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
                updateCart.Parameters.AddWithValue("userid", request.UserId);
                updateCart.Parameters.AddWithValue("cart", jsonCart);

                //Змінна, яка визначає ререривання виконання методу доки, коли не буде виконана команда
                var rowsAffected = await updateCart.ExecuteNonQueryAsync();
                //Створення нового Guid
                var guid = Guid.NewGuid();

                //Якщо кошика не знайдено, створюємо новий
                if (rowsAffected == 0)
                {
                    var createCart = new NpgsqlCommand("insert into public.carts (cartid, userid, cart) values (@cartid, @userid, @cart) on conflict (userid) do nothing", connection);
                    createCart.Parameters.AddWithValue("cartid", guid);
                    createCart.Parameters.AddWithValue("userid", request.UserId);
                    createCart.Parameters.AddWithValue("cart", jsonCart);

                    await createCart.ExecuteNonQueryAsync();
                }
                   

<<<<<<< HEAD
                return Ok();
=======
                return Ok(new
                {
                    UserId = request.UserId,
                    Cart = request.Cart
                });

>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
