namespace api.Models
{
    public class Board
    {
        public string Id { get; set; }
        public string InviteCode { get; set; }
        public string Title { set; get; }
        public List<BoardColumn> Columns { get; set; } = new List<BoardColumn>();
    }
}