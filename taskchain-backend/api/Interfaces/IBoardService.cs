using api.Models;

namespace api.Interfaces
{
    public interface IBoardService
    {
        public Board Save(Board board, User user);
    }
}