namespace api.Models
{
    public class BoardColumn
    {
        public string Title { get; set; }
        public List<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}