using Microsoft.AspNetCore.Mvc;
using CRUD.Repositories;
using CRUD.Models;

namespace CRUD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductInterface _productInterface;

        public ProductsController(IProductInterface productInterface)
        {
            _productInterface = productInterface;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllAsync() {
            var products = await _productInterface.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetByIdAsync(int id)
        {
            var product = await _productInterface.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult> AddAsync(Product product)
        {
            await _productInterface.AddAsync(product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAsync(Product product)
        {
            await _productInterface.UpdateAsync(product);
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAsync(int id)
        {
            await _productInterface.DeleteAsync(id);
            return Ok();
        }
    }
}