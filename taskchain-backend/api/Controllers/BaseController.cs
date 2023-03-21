using api.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class BaseController : ControllerBase
    {
        /// <summary>
        /// used for accessing user-related functionality
        /// </summary>
        public IUserService UserService
        {
            get
            {
                return new UserService();
            }
            set { }
        }

        /// <summary>
        /// used for accessing board-related functionality
        /// </summary>
        public IBoardService BoardService
        {
            get
            {
                return new BoardService();
            }
            set { }
        }
    }
}