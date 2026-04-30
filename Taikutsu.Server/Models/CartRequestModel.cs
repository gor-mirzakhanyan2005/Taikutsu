using System.ComponentModel.DataAnnotations;

namespace Taikutsu.Server.Models
{
    public class CartRequestModel
    {
        public string? CartId { get; set; }
        public string? UserId { get; set; }
        public string[]? Cart {  get; set; }
    }
}
