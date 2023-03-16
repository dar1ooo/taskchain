namespace api.Models.request
{
    public class JoinBoardRequest
    {
        public string InviteCode { get; set; }
        public User User { get; set; }
    }
}