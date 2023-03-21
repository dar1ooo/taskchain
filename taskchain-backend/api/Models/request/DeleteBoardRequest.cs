namespace api.Models.request
{
    public class DeleteBoardRequest
    {
        public string BoardId { get; set; }
        public List<User> Users { get; set; }
    }
}