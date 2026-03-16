namespace Taikutsu.Server.Models
{
    public class PreferenceRequest
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Category {  get; set; }
        public int Score { get; set; }
    }
}
