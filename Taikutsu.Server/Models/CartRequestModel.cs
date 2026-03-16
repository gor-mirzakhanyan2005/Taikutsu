using System.ComponentModel.DataAnnotations;

namespace Taikutsu.Server.Models
{
    public class CartRequestModel
    {
        public string? CartId { get; set; }
        public string? UserEmail { get; set; }
        public string[]? Cart {  get; set; }
    }
}
