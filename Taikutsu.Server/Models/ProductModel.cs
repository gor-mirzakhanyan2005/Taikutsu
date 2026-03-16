namespace Taikutsu.Server.Models
{
    public class ProductModel
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public byte[] ProductImage { get; set; }
        public float ProductPrice { get; set; }
        public int ProductDiscount { get; set; }
        public int ProductRating { get; set; }
        public int ProductCountBought { get; set;  }
        public string[] Categories { get; set; }
    }
}
