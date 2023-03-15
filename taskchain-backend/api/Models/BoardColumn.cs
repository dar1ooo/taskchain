namespace api.Models
{
    public class BoardColumn
    {
        public int Title { get; set; }
        public List<Ticket> Ticket { get; set; } = new List<Ticket>();
    }
}