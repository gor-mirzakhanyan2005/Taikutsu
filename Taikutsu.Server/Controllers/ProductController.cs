using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Transactions;
using Npgsql;
using System.Threading.Tasks;
using Taikutsu.Server.Models;
using System.Text.Json;

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
                    var reviewsJson = reader.GetString(reader.GetOrdinal("productreviews"));


                    products.Add(new ProductModel()
                    {
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
                        ProductReviews = JsonSerializer.Deserialize<List<ReviewDTO>>(reviewsJson, new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        })
                    });
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
