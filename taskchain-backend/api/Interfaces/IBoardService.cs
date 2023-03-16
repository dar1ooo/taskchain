using api.Models;

namespace api.Interfaces
{
    public interface IBoardService
    {
        public Board CreateBoard(string boardTitle, User user);
        public Board GetBoardById(Guid id);

        public Board SaveBoard(Board board);
    }
}