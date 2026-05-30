namespace Taikutsu.Server.Models
{
    public class CategoryInsertRequest
    {
        public string UserId {  get; set; }

        public List<string>? Categories { get; set;  }
    }
}
