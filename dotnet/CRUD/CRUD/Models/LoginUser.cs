namespace CRUD.Models;
using System.ComponentModel.DataAnnotations;


public class LoginUser
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
    public string Email { get; set; }
    
    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
    public string Password { get; set; }
}