using api.Models;

namespace api.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Registers and saves user in MongoDb
        /// </summary>
        /// <param name="user"></param>
        public User? RegisterUser(UserRegister user);

        /// <summary>
        /// Hashes a password
        /// </summary>
        /// <param name="password"></param>
        /// <returns>password hash</returns>
        public string HashPassword(string password);

        /// <summary>
        /// Verifies a entered password with a hash
        /// </summary>
        /// <param name="hashedPassword"></param>
        /// <param name="password"></param>
        /// <returns>true or false</returns>
        public bool VerifyHashedPassword(string hashedPassword, string password);

        /// <summary>
        /// Gets a list of usernames
        /// </summary>
        /// <returns>List of taken usernames</returns>
        public List<string> GetTakenUsernames();

        /// <summary>
        /// Authenticates and logs in user
        /// </summary>
        /// <param name="user"></param>
        /// <returns>Found user</returns>
        public User LoginUser(UserLogin user);

        /// <summary>
        /// Adds a user to a board
        /// </summary>
        /// <param name="user"></param>
        /// <param name="board"></param>
        public void AddUserToBoard(User user, Board board);

        /// <summary>
        /// Loads all boards for a user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public List<BoardOverview> GetBoards(User user);

        /// <summary>
        /// Gets all users assigned to a board
        /// </summary>
        /// <param name="boardId"></param>
        /// <returns>List of users</returns>
        public List<User> GetAllUsers(string boardId);

        /// <summary>
        /// Removes a user from a board
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="boardId"></param>
        public void RemoveUserFromBoard(Guid userId, Guid boardId);
    }
}