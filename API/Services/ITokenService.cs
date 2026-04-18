using API.Entities;

namespace API.Admin.Services;

public interface ITokenService
{
    string CreateToken(User user);
}
