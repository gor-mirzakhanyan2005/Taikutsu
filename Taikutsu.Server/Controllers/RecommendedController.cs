using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class RecommendedController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public RecommendedController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        //Алгоритм отримання даних про рекомендовані товари
        public async Task<IActionResult> GetRecommended([FromQuery] string userId)
        {
            //Ключ для з'єднання з БД
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");
            //Створення самого з'єднання
            await using var conn = new NpgsqlConnection(connectionString);

            //Спроба отримати дані
            try
            {
                //Асинхронне відкриття з'єднання
                await conn.OpenAsync();

                //Змінна із запитом до бази даних
                var cmd = new NpgsqlCommand(@"select 
                    p.*,
                    COALESCE(SUM(up.score), 0) as total_score
                    from apiproducts p
                    left join userpreferences up
                        on up.category = p.productcategories
                        and up.userid = @userid
                    group by 
                        p.productid,
                        p.productname,
                        p.productdescription,
                        p.productthumbnail,
                        p.productprice,
                        p.productdiscount,
                        p.productrating,
                        p.productcountbought,
                        p.productcategories,
                        p.productimages
                    order by total_score desc, p.productcountbought desc, p.productrating desc
                    limit 194;", conn);

                //Параметр з ідентифікатором користувача додається до команди
                cmd.Parameters.AddWithValue("userid", userId);

                //Змінна з читачем даних
                var reader = await cmd.ExecuteReaderAsync();

                //Змінна, яка є списком товарів
                var products = new List<ProductModel>();

                //Коли читач відкритий, до списку додаються товари за моделлю ProductModel
                while (await reader.ReadAsync())
                {
                    products.Add(new ProductModel()
                    {
                        ProductID = reader.GetInt32(0),
                        ProductName = reader.GetString(1),
                        ProductDescription = reader.GetString(2),
                        ProductThumbnail = reader.GetString(3),
                        ProductImages = reader.GetFieldValue<string[]>(4),
                        Categories = reader.GetFieldValue<string>(5),
                        ProductRating = reader.GetInt32(6),
                        ProductCountBought = reader.GetInt32(7),
                        ProductPrice = reader.GetInt32(8),
                        ProductDiscount = reader.GetInt32(9),
                    });
                }
                //Повертається список товарів
                return Ok(products);
            }
            //При невдалій спробі, надсилаємо до клієнту дані про помилку
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
