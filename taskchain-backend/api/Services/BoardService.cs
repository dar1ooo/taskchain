using api.Interfaces;
using api.Models;
using MongoDB.Driver;

namespace api.Services
{
    public class BoardService : IBoardService
    {
        private MongoCRUD MongoCRUD { get; set; }
        private string collection { get; set; }

        public BoardService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "taskchain");
            collection = "Boards";
        }

        public Board Save(Board board, User user)
        {
            MongoDbBoard mongoDbBoard = new MongoDbBoard(board);
            mongoDbBoard.InviteCode = RandomString(6);
            if (board.Id == String.Empty)
            {
                mongoDbBoard.Owner = user.Id;
            }

            MongoCRUD.InsertRecord(collection, mongoDbBoard);

            if (mongoDbBoard.Id.ToString() == String.Empty)
            {
                return null;
            }

            return new Board(mongoDbBoard);
        }

        private static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public Board GetBoardById(Guid id)
        {
            try
            {
                var arrayFilter = Builders<MongoDbBoard>.Filter.Eq("_id", id);
                MongoDbBoard foundBoard = MongoCRUD.FindRecord(collection, arrayFilter);

                return new Board()
                {
                    Id = foundBoard.Id.ToString(),
                    Title = foundBoard.Title,
                    Columns = foundBoard.Columns,
                    InviteCode = foundBoard.InviteCode,
                };
            }
            catch
            {
                throw;
            }
        }
    }
}