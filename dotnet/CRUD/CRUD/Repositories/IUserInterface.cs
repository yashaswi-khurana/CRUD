using CRUD.Models;

namespace CRUD.Repositories;

public interface IUserInterface
{
    Task<LoginUser> Login(LoginUser user);
    Task<User> Register(User user);
}