using System.ComponentModel.DataAnnotations;
namespace CRUD.Models;

public class User
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Username is required.")]
    [StringLength(25, ErrorMessage = "Username cannot exceed 50 characters.")]
    public string User_Name { get; set; }

    [Required(ErrorMessage = "First name is required.")]
    [StringLength(25, ErrorMessage = "First name cannot exceed 50 characters.")]
    public string First_Name { get; set; }

    [StringLength(25, ErrorMessage = "Middle name cannot exceed 50 characters.")]
    public string Middle_Name { get; set; }

    [StringLength(25, ErrorMessage = "Last name cannot exceed 50 characters.")]
    public string Last_Name { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long.")]
    public string Password { get; set; }
}