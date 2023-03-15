namespace api.Models.request
{
    public class CreateBoardRequest
    {
        public Board Board { get; set; }
        public User User { get; set; }
    }
}