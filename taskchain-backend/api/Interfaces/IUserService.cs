using api.Models;

namespace api.Interfaces
{
    public interface IUserService
    {
        public User RegisterUser(UserRegister user);

        public string HashPassword(string password);

        public bool VerifyHashedPassword(string hashedPassword, string password);

        public List<string> GetTakenUsernames();

        public User AuthenticateUser(UserLogin user);

        public void AddUserToBoard(User user, Board board);
    }
}