using api.Models.request;
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
    [Route("save")]
    public IActionResult Save(SaveBoardRequest request)
    {
        //List<string> usernames = boardService

        boardService.Save(request.Board);

        return Ok();
    }
}