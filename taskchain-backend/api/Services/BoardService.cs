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
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "taskchain"); // Initialize MongoCRUD with database and collection names
            collection = "Boards";
        }

        // Method for creating a new Board with given title and user as owner
        public Board? CreateBoard(string boardTitle, User user)
        {
            try
            {
                MongoDbBoard mongoDbBoard = new MongoDbBoard(new Board() { Title = boardTitle });
                mongoDbBoard.Owner = user.Id; // Set board owner as the given user

                bool inviteCodeExists = true;
                do
                {
                    // Generate a 6-character random string to use as the board's invite code
                    mongoDbBoard.InviteCode = RandomInviteCode(6);

                    // Check if a board with the generated invite code already exists, if not, set inviteCodeExists to false to exit the loop
                    if (GetBoardByInviteCode(mongoDbBoard.InviteCode) == null)
                    {
                        inviteCodeExists = false;
                    }
                } while (inviteCodeExists); // Loop until a unique invite code is generated

                MongoCRUD.InsertRecord(collection, mongoDbBoard);

                return new Board(mongoDbBoard);
            }
            catch
            {
                // If an exception is thrown during the creation process, return null
                return null;
            }
        }

        // Method for updating an existing board with new title and column data
        public Board SaveBoard(Board board)
        {
            var update = Builders<MongoDbBoard>.Update
                .Set(p => p.Title, board.Title) // Update board title
                .Set(p => p.Columns, board.Columns); // Update board columns

            MongoCRUD.UpsertRecord(collection, new Guid(board.Id), update); // Upsert the updated board record into the database

            return board;
        }

        // Method for retrieving a board by its unique ID
        public Board? GetBoardById(Guid id)
        {
            try
            {
                var arrayFilter = Builders<MongoDbBoard>.Filter.Eq("_id", id); // Create a filter to find the board with the given ID
                MongoDbBoard foundBoard = MongoCRUD.FindRecord(collection, arrayFilter); // Find the board in the database

                if (foundBoard != null)
                {
                    return new Board()
                    {
                        Id = foundBoard.Id.ToString(),
                        Title = foundBoard.Title,
                        Columns = foundBoard.Columns,
                        InviteCode = foundBoard.InviteCode,
                        Owner = foundBoard.Owner,
                    };
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                throw;
            }
        }

        public Board? GetBoardByInviteCode(string inviteCode)
        {
            var arrayFilter = Builders<MongoDbBoard>.Filter.Eq("InviteCode", inviteCode);

            // Retrieve a document from the MongoDB database by the invite code.
            MongoDbBoard foundBoard = MongoCRUD.FindRecord(collection, arrayFilter);

            if (foundBoard == null)
            {
                return null;
            }

            return new Board(foundBoard);
        }

        public void DeleteBoard(Guid boardId)
        {
            // Filter documents by the board ID using the Eq method of the FilterDefinitionBuilder class.
            var arrayFilter = Builders<MongoDbBoard>.Filter.Eq("_id", boardId);

            // Delete a document from the MongoDB database by the board ID.
            MongoCRUD.DeleteRecord(collection, arrayFilter);
        }

        // Generates a random invite code of a given length.
        private static string RandomInviteCode(int length)
        {
            // Initialize a new instance of the Random class to generate a random number.
            Random random = new();

            // Define a string containing all possible characters.
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            // Generate a random string of the given length by selecting random characters from the chars string.
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}