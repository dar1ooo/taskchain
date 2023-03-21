namespace api.Models.request
{
    public class RemoveUserRequest
    {
        public string UserId { get; set; } = String.Empty;
        public string BoardId { get; set; } = String.Empty;
    }
}