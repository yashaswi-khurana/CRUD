using CRUD.Models;
using Dapper;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

namespace CRUD.Repositories;

public class UserRepository : IUserInterface
{
    private readonly IConfiguration _configuration;

    public UserRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private MySqlConnection GetConnection()
    {
        return new MySqlConnection(_configuration.GetConnectionString("UserConnection"));
    }

    public async Task<User> Register(User user)
    {
        using var connection = GetConnection();
        await connection.OpenAsync();

        try
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            var query = @"
                INSERT INTO user (first_name, middle_name, last_name, email, username, password)
                VALUES (@First_Name, @Middle_Name, @Last_Name, @Email, @User_Name, @Password);";

            await connection.ExecuteAsync(query, user);

            return user;
        }
        catch (Exception ex)
        {
            // Log the exception
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }

    public async Task<LoginUser?> Login(LoginUser user)
    {
        using var connection = GetConnection();
        await connection.OpenAsync();

        try
        {
            var query = @"
            SELECT email, password
            FROM user
            WHERE email = @Email;";

            var result = await connection.QueryFirstOrDefaultAsync<LoginUser>(query, new { user.Email });

            if (result != null && BCrypt.Net.BCrypt.Verify(user.Password, result.Password))
            {
                // result.Password = null;
                return result;
            }

            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }
}