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
        public async Task<IActionResult> Get()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CartRequestModel request)
        {
            try
            {
                var connString = _configuration.GetConnectionString("DiplomaWorkDB");

                await using var connection = new NpgsqlConnection(connString);
                await connection.OpenAsync();

                var guid = Guid.NewGuid();

                var createCart = new NpgsqlCommand("insert into public.carts (cartid, useremail, cart) values (@cartid, @useremail, '{}')", connection);
                createCart.Parameters.AddWithValue("cartid", guid);
                createCart.Parameters.AddWithValue("useremail", request.UserEmail);

                await createCart.ExecuteNonQueryAsync();

                return Ok(new
                {
                    CartId = guid,
                    UserEmail = request.UserEmail
                });
            }
            catch
            {
                return BadRequest("Failed to create cart");
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] CartUpdateRequests request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var connString = _configuration.GetConnectionString("DiplomaWorkDB");

                await using var connection = new NpgsqlConnection(connString);
                await connection.OpenAsync();

                var jsonCart = JsonSerializer.Serialize(request.Cart);

                var updateCart = new NpgsqlCommand("update carts set cart = @cart where useremail = @useremail", connection);
                updateCart.Parameters.AddWithValue("useremail", request.UserEmail);
                updateCart.Parameters.AddWithValue("cart", jsonCart);

                var rowsAffected = await updateCart.ExecuteNonQueryAsync();

                if (rowsAffected == 0)
                {
                    return NotFound("Cart not found.");
                }

                return Ok(new
                {
                    UserEmail = request.UserEmail,
                    Cart = request.Cart
                });

            }
            catch (Exception ex)
            {
                {
                    return StatusCode(500, ex.Message);
                }
            }
        }
    }
}
