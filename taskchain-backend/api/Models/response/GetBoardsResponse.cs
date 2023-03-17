namespace api.Models.response
{
    public class GetBoardsResponse
    {
        public List<BoardOverview> Boards { get; set; } = new List<BoardOverview>();
    }
}
