using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using CRUD.Models;
using CRUD.Repositories;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;

namespace CRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface _userInterface;
        private readonly IConfiguration configuration;

        public UserController(IUserInterface userInterface, IConfiguration configuration)
        {
            _userInterface = userInterface;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is required.");
            }

            try
            {
                var registeredUser = await _userInterface.Register(user);
                return CreatedAtAction(nameof(Register), new { id = registeredUser.Id }, registeredUser);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, $"An error occurred while registering the user: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginUser>> Login([FromBody] LoginUser user)
        {
            if (string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest("Email and password are required.");
            }

            try
            {
                var loggedInUser = await _userInterface.Login(user);

                if (loggedInUser == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("UserId", user.Email.ToString())
                };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: signIn);
                    string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new{Token=tokenValue,loggedInUser});
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, $"An error occurred while logging in: {ex.Message}");
            }
        }
    }
    
}