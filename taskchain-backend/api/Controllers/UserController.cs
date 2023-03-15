using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{
    public UserController(IUserService service) : base(service)
    {
    }

    /// <summary>
    /// Route to create a user in the database
    /// </summary>
    /// <param name="userRegister"></param>
    /// <returns>Created User or error code</returns>
    [HttpPost]
    [Route("register")]
    public IActionResult Register(UserRegister userRegister)
    {
        User user = _userService.RegisterUser(userRegister);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    /// <summary>
    /// Route for login
    /// </summary>
    /// <param name="user"></param>
    /// <returns>404 or 200 and returns found user if successful</returns>
    [HttpPost]
    [Route("login")]
    public IActionResult Login(UserLogin user)
    {
        try
        {
            var result = _userService.AuthenticateUser(user);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        catch
        {
            return NotFound();
        }
    }

    /// <summary>
    /// route get all usernames from db
    /// </summary>
    /// <returns>list with usernames</returns>
    [HttpGet]
    [Route("usernames")]
    public IActionResult GetTakenUsernames()
    {
        List<string> usernames = _userService.GetTakenUsernames();

        return Ok(usernames);
    }
}