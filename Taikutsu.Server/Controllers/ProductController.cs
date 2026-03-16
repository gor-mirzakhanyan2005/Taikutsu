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

        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string query = @"select * from Products";
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            try
            {
                var products = new List<object>();

                await using var dataSource = NpgsqlDataSource.Create(connectionString);
                await using var cmd = dataSource.CreateCommand(query);

                using var reader = await cmd.ExecuteReaderAsync();

                while(await reader.ReadAsync())
                {
                    products.Add(new ProductModel
                    {
                        ProductID = reader.GetInt32(0),
                        ProductName = reader.GetString(1),
                        ProductDescription = reader.GetString(2),
                        ProductImage = reader.GetFieldValue<byte[]>(3),
                        ProductPrice = reader.GetFloat(4),
                        ProductDiscount = reader.GetInt32(5),
                        ProductRating = reader.GetInt32(6),
                        ProductCountBought = reader.GetInt32(7),
                        Categories = reader.GetFieldValue<string[]>(8)
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
