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

        public Board CreateBoard(string boardTitle, User user)
        {
            MongoDbBoard mongoDbBoard = new MongoDbBoard(new Board() { Title = boardTitle });
            mongoDbBoard.InviteCode = RandomString(6);
            mongoDbBoard.Owner = user.Id;

            MongoCRUD.InsertRecord(collection, mongoDbBoard);

            return new Board(mongoDbBoard);
        }

        public Board SaveBoard(Board board)
        {
            var update = Builders<MongoDbBoard>.Update
                .Set(p => p.Title, board.Title)
                .Set(p => p.Columns, board.Columns);

            MongoCRUD.UpsertRecord(collection, new Guid(board.Id), update);

            return board;
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
                    Owner = foundBoard.Owner,
                };
            }
            catch
            {
                throw;
            }
        }
        private static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}