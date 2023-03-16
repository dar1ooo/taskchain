namespace api.Models.request
{
    public class CreateBoardRequest
    {
        public string BoardTitle { get; set; }
        public User User { get; set; }
    }
}