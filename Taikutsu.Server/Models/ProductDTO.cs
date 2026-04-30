namespace Taikutsu.Server.Models
{
    public class ProductDTO
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string thumbnail { get; set; }
        public float price { get; set; }
        public float discountPercentage { get; set; }
        public float rating { get; set; }
        public string category { get; set; }
        public string[] images { get; set; }
    }

    public class ApiJson
    {
        public List<ProductDTO> Products { get; set; } = [];
    }
}
