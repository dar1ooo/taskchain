using api.Models;

namespace api.Interfaces
{
    public interface IUserService
    {
        public void RegisterUser(MongoDbUser user);

        public string HashPassword(string password);

        public bool VerifyHashedPassword(string hashedPassword, string password);

        public List<string> GetTakenUsernames();

        public User AuthenticateUser(UserLogin user);
    }
}