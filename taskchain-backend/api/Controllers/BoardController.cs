using api.Models;
using api.Models.request;
using api.Models.response;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BoardController : BaseController
{
    [HttpPost]
    [Route("createBoard")]
    public IActionResult CreateBoard(CreateBoardRequest request)
    {
        Board board = boardService.CreateBoard(request.BoardTitle, request.User);

        if (board == null)
        {
            return BadRequest();
        }

        userService.AddUserToBoard(request.User, board);

        CreateBoardResponse response = new()
        {
            Board = board
        };

        return Ok(response);
    }

    [HttpPost]
    [Route("save")]
    public IActionResult SaveBoard(SaveBoardRequest request)
    {
        Board board = boardService.SaveBoard(request.Board);

        SaveBoardResponse response = new()
        {
            Board = board
        };

        return Ok(response);
    }

    [HttpPost]
    [Route("board")]
    public IActionResult GetBoard(GetBoardRequest request)
    {
        Board board = boardService.GetBoardById(new Guid(request.BoardId));

        return Ok(board);
    }

    [HttpPost]
    [Route("deleteBoard")]
    public IActionResult DeleteBoard(DeleteBoardRequest request)
    {
        boardService.DeleteBoard(new Guid(request.BoardId));

        foreach (User user in request.Users)
        {
            userService.RemoveUserFromBoard(new Guid(user.Id), new Guid(request.BoardId));
        }

        return Ok();
    }
}