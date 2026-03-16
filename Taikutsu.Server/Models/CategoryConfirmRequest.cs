namespace Taikutsu.Server.Models
{
    public class CategoryConfirmRequest
    {
        public string email { get; set; }
        public string[] categories { get; set; }
    }
}
