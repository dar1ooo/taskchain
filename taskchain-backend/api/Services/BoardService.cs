using api.Interfaces;
using api.Models;

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

        public void Save(Board board)
        {
            MongoDbBoard mongoDbBoard = new MongoDbBoard(board);
            
            MongoCRUD.InsertRecord<MongoDbBoard>(collection, mongoDbBoard);


        }
    }
}