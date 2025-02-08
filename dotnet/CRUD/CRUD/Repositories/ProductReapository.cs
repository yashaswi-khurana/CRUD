using CRUD.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace CRUD.Repositories;

public class ProductRepository : IProductInterface
{
    private readonly IConfiguration _configuration;

    public ProductRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<List<Product>> GetAllAsync()
    {
        using var connection = GetConnection();
        var products = await connection.QueryAsync<Product>("CALL GetProducts()");
        return products.ToList();
    }

    public async Task<Product> GetByIdAsync(int id)
    {
        using var connection = GetConnection();
        var product = await connection.QuerySingleOrDefaultAsync<Product>("CALL GetProductById(@Id)", new { @Id = id });
        return product;
    }

    public async Task AddAsync(Product product) 
    {
        using var connection = GetConnection();
        await connection.ExecuteAsync(
            "Call AddProduct(@Name, @Description, @Price, @Qty)",
            new
            {
                @Name = product.Name, @Description = product.Description, @Price = product.Price, @Qty = product.Qty
            }
        );
    }

    public async Task UpdateAsync(Product product)
    {
        using var connection = GetConnection();
        await connection.ExecuteAsync(
            "CALL UpdateProduct(@Id,@Name, @Description,@Qty, @Price)",
            new
            {
                @Id = product.Id, @Name = product.Name, @Description = product.Description,
                @Qty = product.Qty, @Price = product.Price
            }
        );
    }

    public async Task DeleteAsync(int id)
    {
        using var connection = GetConnection();
        await connection.ExecuteAsync(
            "Call DeleteProduct(@Id)",
            new { @Id = id }
        );
    }

    private MySqlConnection GetConnection()
    {
        return new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));
    }
}