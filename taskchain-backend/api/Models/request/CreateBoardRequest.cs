namespace api.Models.request
{
    public class CreateBoardRequest
    {
        public string BoardTitle { get; set; } = String.Empty;
        public User User { get; set; } = new();
    }
}