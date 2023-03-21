using api.Interfaces;
using api.Models;
using MongoDB.Driver;
using System.Security.Cryptography;

namespace api.Services
{
    public class UserService : IUserService
    {
        //Declare the MongoCRUD instance and collection name for this service.
        private MongoCRUD MongoCRUD { get; set; }

        private string collection { get; set; }

        //Initialize the MongoCRUD instance with the connection string and database name.
        //Set the collection name to "Users".
        public UserService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "taskchain");
            collection = "Users";
        }

        //Registers a new user.
        //Checks for taken usernames, hashes the password, and adds the user to the database.
        //Returns a User object with the new user's Id and Username.
        public User? RegisterUser(UserRegister user)
        {
            List<string> usernames = GetTakenUsernames();

            //check for taken usernames
            if (!usernames.Any(username => username == user.Username))
            {
                MongoDbUser mongoDbUser = new();
                mongoDbUser.Password = HashPassword(user.Password);
                mongoDbUser.Username = user.Username;
                mongoDbUser.Boards = new List<BoardOverview>();

                MongoCRUD.InsertRecord(collection, mongoDbUser);

                var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
                MongoDbUser foundUser = MongoCRUD.FindRecord(collection, arrayFilter);

                return new User()
                {
                    Id = foundUser.Id.ToString(),
                    Username = foundUser.Username,
                };
            }
            else
            {
                return null;
            }
        }

        //Logs in a user.
        //Finds the user in the database by username, then verifies the hashed password.
        //Returns a User object with the user's Id, Username, and Boards.
        public User LoginUser(UserLogin user)
        {
            try
            {
                var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
                MongoDbUser foundUser = MongoCRUD.FindRecord(collection, arrayFilter);

                if (foundUser != null)
                {
                    //check if password hash is valid
                    if (VerifyHashedPassword(foundUser.Password, user.Password))
                    {
                        return new User()
                        {
                            Id = foundUser.Id.ToString(),
                            Username = foundUser.Username,
                            Boards = foundUser.Boards,
                        };
                    }
                }

                throw new Exception();
            }
            catch
            {
                throw;
            }
        }

        //Adds a user to a board.
        //Finds the user in the database by user.Id, adds the board to their Boards list, and updates the database.
        public void AddUserToBoard(User user, Board board)
        {
            MongoDbUser dbUser = new()
            {
                Id = new Guid(user.Id),
                Boards = user.Boards,
            };

            dbUser.Boards.Add(new BoardOverview() { Id = board.Id, Title = board.Title });

            var update = Builders<MongoDbUser>.Update
                .Set(p => p.Boards, dbUser.Boards);

            MongoCRUD.UpsertRecord("Users", dbUser.Id, update);
        }

        //Returns a list of usernames that are already taken.
        public List<string> GetTakenUsernames()
        {
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>(collection);
            return users.Select(x => x.Username).ToList();
        }

        // This method retrieves all boards for a given user.
        public List<BoardOverview> GetBoards(User user)
        {
            // Filter the collection of users to find the one with the matching username.
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
            MongoDbUser foundUser = MongoCRUD.FindRecord(collection, arrayFilter);

            // Return the boards associated with the user.
            return foundUser.Boards;
        }

        // This method retrieves all users that are associated with a specific board.
        public List<User> GetAllUsers(string boardId)
        {
            // Load all users in the database.
            List<MongoDbUser> foundUsers = MongoCRUD.LoadRecords<MongoDbUser>(collection);
            List<User> users = new();

            // Iterate over each user to find those associated with the board.
            foreach (MongoDbUser foundUser in foundUsers)
            {
                // Check if the user has the specified board.
                if (foundUser.Boards.Any(board => board.Id == boardId))
                {
                    // Create a new User object and add it to the list of users associated with the board.
                    users.Add(new User()
                    {
                        Id = foundUser.Id.ToString(),
                        Username = foundUser.Username,
                    });
                }
            }

            // Return the list of users associated with the board.
            return users;
        }

        // This method removes a user from a board.
        public void RemoveUserFromBoard(Guid userId, Guid boardId)
        {
            // Filter the collection of users to find the one with the matching user ID.
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("_id", userId);
            MongoDbUser foundUser = MongoCRUD.FindRecord(collection, arrayFilter);

            // Find the board associated with the user and remove it.
            BoardOverview? board = foundUser.Boards.FirstOrDefault(board => board.Id == boardId.ToString());
            if (board != null)
            {
                foundUser.Boards.Remove(board);
            }

            // Update the user's boards in the database.
            var update = Builders<MongoDbUser>.Update.Set(p => p.Boards, foundUser.Boards);
            MongoCRUD.UpsertRecord("Users", foundUser.Id, update);
        }

        // This method hashes a given password using a salt.
        public string HashPassword(string password)
        {
            // Create a salt for the hash using the Rfc2898DeriveBytes class.
            byte[] salt;
            byte[] buffer2;
            using (Rfc2898DeriveBytes bytes = new(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }

            // Combine the salt and hash into a single string and return it.
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            byte[] buffer4;

            // Convert the hashed password from Base64 string to byte array
            byte[] src = Convert.FromBase64String(hashedPassword);

            // Verify that the length of the byte array is 49 (0x31) and that the first byte is 0
            if ((src.Length != 0x31) || (src[0] != 0))
            {
                return false;
            }

            // Extract the salt from the byte array
            byte[] dst = new byte[0x10];
            Buffer.BlockCopy(src, 1, dst, 0, 0x10);

            // Extract the hashed password from the byte array
            byte[] buffer3 = new byte[0x20];
            Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);

            // Hash the user's input password with the extracted salt
            using (Rfc2898DeriveBytes bytes = new(password, dst, 0x3e8))
            {
                buffer4 = bytes.GetBytes(0x20);
            }

            // Compare the hashed password from the user input to the hashed password from the database
            return buffer4.SequenceEqual(buffer3);
        }
    }
}