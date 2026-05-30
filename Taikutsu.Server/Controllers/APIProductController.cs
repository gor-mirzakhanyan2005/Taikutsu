using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Security.Cryptography;
using Taikutsu.Server.Models;

namespace Taikutsu.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class APIProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public APIProductController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            var client = _httpClientFactory.CreateClient();
            Random random = new Random();
            string connectionString = _configuration.GetConnectionString("DiplomaWorkDB");

            var apiResponse = await client.GetFromJsonAsync<ApiJson>(
                "https://dummyjson.com/products?limit=194&select=id,title,description,thumbnail,images,price,discountPercentage,rating,category,reviews"
            );

            if (apiResponse == null)
            {
                return BadRequest("Product API Error");
            }

            try
            {
                await using var conn = new NpgsqlConnection(connectionString);
                await using var command = new NpgsqlCommand(
                    @"INSERT INTO APIProducts (
                    productid,
                    productname,
                    productdescription,
                    productthumbnail,
                    productimages,
                    productprice,
                    productrating,
                    productdiscount,
                    productcategories,
                    productcountbought,
                    productreviews
                    ) VALUES (
                        @productid,
                        @productname,
                        @productdescription,
                        @productthumbnail,
                        @productimages::TEXT[],
                        @productprice,
                        @productrating,
                        @productdiscount,
                        @productcategories,
                        @productcountbought,
                        @productreviews
                    ) ON CONFLICT (productid) DO UPDATE SET
                        productname       = EXCLUDED.productname,
                        productdescription = EXCLUDED.productdescription,
                        productthumbnail  = EXCLUDED.productthumbnail,
                        productimages     = EXCLUDED.productimages,
                        productprice      = EXCLUDED.productprice,
                        productrating     = EXCLUDED.productrating,
                        productdiscount   = EXCLUDED.productdiscount,
                        productcategories = EXCLUDED.productcategories,
                        productcountbought = EXCLUDED.productcountbought,
                        productreviews = EXCLUDED.productreviews", conn);

                await conn.OpenAsync();

                foreach(var p in apiResponse.Products)
                {
                    command.Parameters.Clear();

                    int countbought = random.Next(500, 3001);

                    command.Parameters.AddWithValue("productid", p.id);
                    command.Parameters.AddWithValue("productname", p.title);
                    command.Parameters.AddWithValue("productdescription", p.description);
                    command.Parameters.AddWithValue("productthumbnail", p.thumbnail);
                    command.Parameters.AddWithValue("productimages", p.images);
                    command.Parameters.AddWithValue("productprice", p.price);
                    command.Parameters.AddWithValue("productrating", p.rating);
                    command.Parameters.AddWithValue("productdiscount", p.discountPercentage);
                    command.Parameters.AddWithValue("productcategories", p.category);
                    command.Parameters.AddWithValue("productcountbought", countbought);
                    command.Parameters.AddWithValue("productreviews", NpgsqlTypes.NpgsqlDbType.Jsonb,
                        System.Text.Json.JsonSerializer.Serialize(p.reviews));

                    await command.ExecuteNonQueryAsync();
                }

                return Ok(new { message = "Products imported successfully" });
            }
            catch (NpgsqlException ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500);
            }
        }
    }
}
