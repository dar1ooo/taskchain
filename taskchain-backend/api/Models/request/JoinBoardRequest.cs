namespace api.Models.request
{
    public class JoinBoardRequest
    {
        public string InviteCode { get; set; } = String.Empty;
        public User User { get; set; } = new();
    }
}