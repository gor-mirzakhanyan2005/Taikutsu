namespace Taikutsu.Server.Models
{
    public class CartItemModel
    {
        public int? ProductID { get; set; }
        public string? ProductName { get; set; }
        public int Count { get; set; }
        public string ProductThumbnail { get; set; }
        public float ProductPrice { get; set; }
        public int ProductDiscount { get; set; }
        public string? Categories { get; set; }
    }
    public class GetCartModel
    {
        public Guid? CartId { get; set; }
        
        public List<CartItemModel>? Cart {  get; set; }
        public string? UserId { get; set; }
    }
}
