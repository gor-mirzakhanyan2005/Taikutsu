using System.ComponentModel.DataAnnotations;

namespace Taikutsu.Server.Models
{
    public class UserModel
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        public string UserName { get; set; }
        public DateTime RegisDate { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
        public string[] UserPreferences {  get; set; }
    }
}
