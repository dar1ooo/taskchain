namespace api.Models.response
{
    public class JoinBoardResponse
    {
        public string BoardId { get; set; } = String.Empty;
        public User User { get; set; } = new();
    }
}