namespace api.Models
{
    public class Board
    {
        public Board()
        {
        }

        public Board(MongoDbBoard mongoDbBoard)
        {
            Id = mongoDbBoard.Id.ToString();
            InviteCode = mongoDbBoard.InviteCode;
            Title = mongoDbBoard.Title;
            Columns = mongoDbBoard.Columns;
            Owner = mongoDbBoard.Owner;
        }

        public string Id { get; set; } = String.Empty;
        public string InviteCode { get; set; } = String.Empty;
        public string Title { set; get; } = String.Empty;
        public string Owner { set; get; } = String.Empty;
        public List<BoardColumn> Columns { get; set; } = new();
    }
}