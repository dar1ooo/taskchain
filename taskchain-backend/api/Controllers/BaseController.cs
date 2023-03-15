using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BaseController : ControllerBase
    {
        protected readonly IUserService _userService;

        public BaseController(IUserService service)
        {
            _userService = service;
        }
    }
}