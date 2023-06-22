using System.ComponentModel.DataAnnotations;

namespace API.Models.Users;

public class LoginUserModel
{
    public LoginUserModel(string email, string password)
    {
        Email = email;
        Password = password;
    }
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; }
    [Required(ErrorMessage="Password is required")]
    public string Password { get; }
}