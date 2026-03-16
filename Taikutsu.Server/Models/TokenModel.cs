using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Taikutsu.Server.Models
{
    public class TokenModel
    {
        [Key]
        public Guid TokenId {  get; set; }
        public Guid UserId { get; set; }
        [ForeignKey("UserId")]
        public UserModel User { get; set; }
        public string Token {  get; set; }
        public DateTime ExpiresAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool Revoked { get; set; } = false;
    }
}
