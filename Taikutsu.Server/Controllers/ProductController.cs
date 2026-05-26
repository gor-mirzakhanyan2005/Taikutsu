using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Transactions;
using Npgsql;
using System.Threading.Tasks;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/products")]
    [ApiController]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ProductController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
<<<<<<< HEAD
=======
        }

        [HttpGet("recommended")]
        public async Task<IActionResult> GetRecommended([FromQuery] string userId)
        {
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");
            await using var conn = new NpgsqlConnection(connectionString);
            try
            {
                await conn.OpenAsync();

                var cmd = new NpgsqlCommand(@"select 
                    p.*,
                    SUM(up.score) as total_score
                    from products p
                    join userpreferences up
                        on up.category = ANY(p.categories)
                    where up.userid = @userid
                    group by 
                        p.productid,
                        p.productname,
                        p.productdescription,
                        p.productthumbnail,
                        p.productprice,
                        p.productdiscount,
                        p.productrating,
                        p.countbought,
                        p.categories,
                        p.productimages
                    order by total_score desc, p.countbought desc, p.productrating desc
                    limit 20;", conn);

                cmd.Parameters.AddWithValue("userid", userId);

                var reader = await cmd.ExecuteReaderAsync();

                var products = new List<ProductModel>();

                while (await reader.ReadAsync())
                {
                    products.Add(new ProductModel()
                    {
                        ProductID = reader.GetInt32(0),
                        ProductName = reader.GetString(1),
                        ProductDescription = reader.GetString(2),
                        ProductThumbnail = reader.GetString(3),
                        ProductPrice = reader.GetFloat(4),
                        ProductDiscount = reader.GetInt32(5),
                        ProductRating = reader.GetInt32(6),
                        ProductCountBought = reader.GetInt32(7),
                        Categories = reader.GetFieldValue<string[]>(8),
                        ProductImages = reader.GetFieldValue<string[]>(9)
                    });
                }
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string query = @"select * from APIProducts";
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            try
            {
                var products = new List<object>();

                await using var dataSource = NpgsqlDataSource.Create(connectionString);
                await using var cmd = dataSource.CreateCommand(query);

                using var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    products.Add(new ProductModel
                    {
<<<<<<< HEAD
                        ProductID = reader.GetInt32(reader.GetOrdinal("productid")),
                        ProductName = reader.GetString(reader.GetOrdinal("productname")),
                        ProductDescription = reader.GetString(reader.GetOrdinal("productdescription")),
                        ProductThumbnail = reader.GetString(reader.GetOrdinal("productthumbnail")),
                        ProductImages = reader.GetFieldValue<string[]>(reader.GetOrdinal("productimages")),
                        Categories = reader.GetString(reader.GetOrdinal("productcategories")),
                        ProductRating = reader.GetInt32(reader.GetOrdinal("productrating")),
                        ProductCountBought = reader.GetInt32(reader.GetOrdinal("productcountbought")),
                        ProductPrice = reader.GetInt32(reader.GetOrdinal("productprice")),
                        ProductDiscount = reader.GetInt32(reader.GetOrdinal("productdiscount")),
=======
                        ProductID = reader.GetInt32(0),
                        ProductName = reader.GetString(1),
                        ProductDescription = reader.GetString(2),
                        ProductThumbnail = reader.GetString(3),
                        ProductPrice = reader.GetFloat(4),
                        ProductDiscount = reader.GetInt32(5),
                        ProductRating = reader.GetInt32(6),
                        ProductCountBought = reader.GetInt32(7),
                        Categories = reader.GetFieldValue<string[]>(8),
                        ProductImages = reader.GetFieldValue<string[]>(9)
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
                    }
                    );
                }
                return Ok(products);
            }
            catch (NpgsqlException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500);
            }
        }
    }
}
