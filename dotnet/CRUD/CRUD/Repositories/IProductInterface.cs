using CRUD.Models;

namespace CRUD.Repositories;

public interface IProductInterface
{
    Task<List<Product>> GetAllAsync();
    
    Task<Product> GetByIdAsync(int id);
    
    Task AddAsync(Product product);
    
    Task UpdateAsync(Product product);
    
    Task DeleteAsync(int id);
}