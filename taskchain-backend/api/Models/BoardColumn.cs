namespace api.Models
{
    public class BoardColumn
    {
        public string Title { get; set; } = String.Empty; 
        public List<Ticket> Tickets { get; set; } = new();
    }
}