using MongoDB.Bson.Serialization.Attributes;

namespace api.Models
{
    public class MongoDbBoard
    {
        public MongoDbBoard()
        {
        }

        public MongoDbBoard(Board board)
        {
            InviteCode = board.InviteCode;
            Title = board.Title;
            Columns = board.Columns;
            Owner = board.Owner;
        }

        [BsonId]
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Owner { get; set; } = String.Empty;

        public string InviteCode { get; set; } = String.Empty;
        public string Title { set; get; } = String.Empty;
        public List<BoardColumn> Columns { get; set; } = new();
    }
}