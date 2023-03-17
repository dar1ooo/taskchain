using api.Interfaces;
using api.Models;
using MongoDB.Driver;
using System.Security.Cryptography;

namespace api.Services
{
    public class UserService : IUserService
    {
        private MongoCRUD MongoCRUD { get; set; }
        private string collection { get; set; }

        public UserService()
        {
            MongoCRUD = new MongoCRUD("mongodb://localhost:27017", "taskchain");
            collection = "Users";
        }

        /// <summary>
        /// Register User to DB
        /// </summary>
        /// <param name="user"></param>
        public User RegisterUser(UserRegister user)
        {
            List<string> usernames = GetTakenUsernames();
            //check for taken usernames
            if (!usernames.Any(username => username == user.Username))
            {
                //create mongodb user to save in the database
                MongoDbUser mongoDbUser = new MongoDbUser();
                mongoDbUser.Password = HashPassword(user.Password);
                mongoDbUser.Username = user.Username;
                mongoDbUser.Boards = new List<BoardOverview>();

                //insert to db
                MongoCRUD.InsertRecord(collection, mongoDbUser);

                var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
                MongoDbUser foundUser = MongoCRUD.FindRecord<MongoDbUser>(collection, arrayFilter);

                return new User()
                {
                    Id = foundUser.Id.ToString(),
                    Username = foundUser.Username,
                };
            }

            return null;
        }

        /// <summary>
        /// log in user in db
        /// </summary>
        /// <param name="user"></param>
        /// <returns>found user</returns>
        public User AuthenticateUser(UserLogin user)
        {
            //filter to find username
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
            try
            {
                MongoDbUser foundUser = MongoCRUD.FindRecord<MongoDbUser>(collection, arrayFilter);

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
                throw new Exception();
            }
            catch
            {
                throw;
            }
        }

        public void AddUserToBoard(User user, Board board)
        {
            MongoDbUser dbUser = new MongoDbUser()
            {
                Id = new Guid(user.Id),
                Boards = user.Boards,
            };

            dbUser.Boards.Add(new BoardOverview() { Id = board.Id, Title = board.Title });

            //filter to find which user to update
            var update = Builders<MongoDbUser>.Update
                .Set(p => p.Boards, dbUser.Boards);

            MongoCRUD.UpsertRecord("Users", dbUser.Id, update);
        }

        /// <summary>
        /// get taken usernames in db
        /// </summary>
        /// <returns>list with usernames</returns>
        public List<string> GetTakenUsernames()
        {
            List<MongoDbUser> users = MongoCRUD.LoadRecords<MongoDbUser>("Users");
            return users.Select(x => x.Username).ToList();
        }

        public List<BoardOverview> GetBoards(User user)
        {
            var arrayFilter = Builders<MongoDbUser>.Filter.Eq("Username", user.Username);
            MongoDbUser foundUser = MongoCRUD.FindRecord(collection, arrayFilter);

            return foundUser.Boards;
        }

        public List<User> GetAllUsers(string boardId)
        {
            List<MongoDbUser> foundUsers = MongoCRUD.LoadRecords<MongoDbUser>(collection);
            List<User> users = new List<User>();

            foreach (MongoDbUser foundUser in foundUsers)
            {
                if (foundUser.Boards.Any(board => board.Id == boardId))
                {
                    users.Add(new User()
                    {
                        Id = foundUser.Id.ToString(),
                        Username = foundUser.Username,
                    });
                }
            }

            return users;
        }

        /// <summary>
        /// hash a password
        /// </summary>
        /// <param name="password"></param>
        /// <returns>password hash</returns>
        public string HashPassword(string password)
        {
            //create salt for hash
            byte[] salt;
            byte[] buffer2;
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            {
                salt = bytes.Salt;
                buffer2 = bytes.GetBytes(0x20);
            }
            byte[] dst = new byte[0x31];
            Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            return Convert.ToBase64String(dst);
        }

        /// <summary>
        /// verify hash of password
        /// </summary>
        /// <param name="hashedPassword"></param>
        /// <param name="password"></param>
        /// <returns>true or false</returns>
        public bool VerifyHashedPassword(string hashedPassword, string password)
        {
            byte[] buffer4;
            byte[] src = Convert.FromBase64String(hashedPassword);
            if ((src.Length != 0x31) || (src[0] != 0))
            {
                return false;
            }
            byte[] dst = new byte[0x10];
            Buffer.BlockCopy(src, 1, dst, 0, 0x10);
            byte[] buffer3 = new byte[0x20];
            Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
            using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
            {
                buffer4 = bytes.GetBytes(0x20);
            }
            return buffer4.SequenceEqual(buffer3);
        }
    }
}