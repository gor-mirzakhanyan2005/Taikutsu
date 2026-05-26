namespace Taikutsu.Server.Models
{
    public class ProductModel
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public string ProductThumbnail { get; set; }
        public float ProductPrice { get; set; }
        public int ProductDiscount { get; set; }
        public int ProductRating { get; set; }
        public int ProductCountBought { get; set;  }
<<<<<<< HEAD
        public string Categories { get; set; }
=======
        public string[] Categories { get; set; }
>>>>>>> 868210d7054466c3f8d446fb4c36d40280a576f5
        public string[] ProductImages { get; set; }
    }
}
