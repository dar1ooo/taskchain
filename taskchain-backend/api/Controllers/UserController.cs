using api.Models;
using api.Models.request;
using api.Models.response;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{
    [HttpPost]
    [Route("register")]
    public IActionResult Register(UserRegister userRegister)
    {
        User user = userService.RegisterUser(userRegister);

        if (user == null)
        {
            return BadRequest();
        }

        return Ok(user);
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login(UserLogin user)
    {
        try
        {
            var result = userService.LoginUser(user);

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

    [HttpGet]
    [Route("usernames")]
    public IActionResult GetTakenUsernames()
    {
        List<string> usernames = userService.GetTakenUsernames();

        return Ok(usernames);
    }

    [HttpPost]
    [Route("join")]
    public IActionResult JoinBoard(JoinBoardRequest request)
    {
        Board foundBoard = boardService.GetBoardByInviteCode(request.InviteCode);

        if (foundBoard != null && !request.User.Boards.Any(board => board.Id == foundBoard.Id))
        {
            userService.AddUserToBoard(request.User, foundBoard);

            JoinBoardResponse response = new JoinBoardResponse();
            response.BoardId = foundBoard.Id;
            response.User = request.User;

            return Ok(response);
        }

        return NotFound();
    }

    [HttpPost]
    [Route("boards")]
    public IActionResult GetBoards(GetBoardsRequest request)
    {
        List<BoardOverview> boards = userService.GetBoards(request.User);

        GetBoardsResponse response = new GetBoardsResponse();
        response.Boards = boards;

        return Ok(response);
    }

    [HttpPost]
    [Route("users")]
    public IActionResult GetAllUsers(GetAllUsersRequest request)
    {
        List<User> users = userService.GetAllUsers(request.BoardId);

        GetAllUsersResponse response = new GetAllUsersResponse();
        response.Users = users;

        return Ok(response);
    }

    [HttpPost]
    [Route("removeUser")]
    public IActionResult RemoveUserFromBoard(RemoveUserRequest request)
    {
        userService.RemoveUserFromBoard(new Guid(request.UserId), new Guid(request.BoardId));

        return Ok();
    }
}