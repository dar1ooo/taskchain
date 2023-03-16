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
        }

        [BsonId]
        public Guid Id { get; set; }

        public string Owner { get; set; }

        public string InviteCode { get; set; }
        public string Title { set; get; }
        public List<BoardColumn> Columns { get; set; } = new List<BoardColumn>();
    }
}