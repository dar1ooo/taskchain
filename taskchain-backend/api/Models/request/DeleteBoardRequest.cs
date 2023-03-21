namespace api.Models.request
{
    public class DeleteBoardRequest
    {
        public string BoardId { get; set; } = String.Empty;
        public List<User> Users { get; set; } = new();
    }
}