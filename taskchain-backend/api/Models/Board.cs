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
            Owner= mongoDbBoard.Owner;
        }

        public string Id { get; set; }
        public string InviteCode { get; set; }
        public string Title { set; get; }
        public string Owner { set; get; }
        public List<BoardColumn> Columns { get; set; } = new List<BoardColumn>();
    }
}