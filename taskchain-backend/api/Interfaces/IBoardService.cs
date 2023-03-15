using api.Models;

namespace api.Interfaces
{
    public interface IBoardService
    {
        public Board CreateBoard(Board board, User user);
    }
}