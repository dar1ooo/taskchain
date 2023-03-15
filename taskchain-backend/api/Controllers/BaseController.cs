using api.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BaseController : ControllerBase
    {
        public IUserService userService
        {
            get
            {
                return new UserService();
            }
            set { }
        }

        public IBoardService boardService
        { get { return new BoardService(); } set { } }
    }
}