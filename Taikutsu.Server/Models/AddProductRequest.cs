namespace Taikutsu.Server.Models
{
    public class AddProductRequest
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public byte ProductThumbnail { get; set; }

        public List<IFormFile> ProductImages { get; set; }
        public float ProductPrice { get; set; }
        public int ProductDiscount { get; set; }
        public string[] Categories { get; set; }
    }
}
