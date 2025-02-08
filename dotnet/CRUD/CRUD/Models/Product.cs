namespace CRUD.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; } // Changed property name from `Stock` to `Qty` to match the database
    }
}