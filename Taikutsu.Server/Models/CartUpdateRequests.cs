namespace Taikutsu.Server.Models
{
    public class CartUpdateRequests
    {
       public string UserId { get; set; }
       public List<ProductBriefInfo> Cart { get; set; }
    }

    public class ProductBriefInfo
    {
        public int ProductID { get; set; }

        public string ProductName { get; set; }

        public int Count { get; set; }

        public int Categories { get; set; }
    }
}
