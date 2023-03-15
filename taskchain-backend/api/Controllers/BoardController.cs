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
    [Route("board")]
    public IActionResult Board(GetBoardRequest request)
    {
        //List<string> usernames = boardService

        return Ok();
    }

    [HttpPost]
    [Route("createBoard")]
    public IActionResult CreateBoard(CreateBoardRequest request)
    {
        Board board = boardService.CreateBoard(request.Board, request.User);

        if (board == null)
        {
            return BadRequest();
        }

        if (request.Board.Id == String.Empty)
        {
            userService.AddUserToBoard(request.User, board);
        }

        CreateBoardResponse response = new();
        response.Board = board;

        return Ok(response);
    }
}