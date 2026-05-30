namespace Taikutsu.Server.Models
{
    public class ReviewDTO
    {
        public int rating { get; set; }
        public string comment { get; set; }
        public string date { get; set; }
        public string reviewerName { get; set; }
    }

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
        public List<ReviewDTO> reviews { get; set; }
    }

    public class ApiJson
    {
        public List<ProductDTO> Products { get; set; } = [];
    }
}
