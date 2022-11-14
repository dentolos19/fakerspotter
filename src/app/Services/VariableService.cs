using FakerSpotter.Models;

namespace FakerSpotter.Services;

public class VariableService
{

    public LeaderboardItem[]? Leaderboard { get; set; }
    public string[]? Tips { get; set; }
    public StatementQuestion[]? StatementQuestions { get; set; }
    public ClosedHeadlineQuestion[]? ClosedHeadlineQuestions { get; set; }
    public MultipleHeadlineQuestion[]? MultipleHeadlineQuestions { get; set; }
    public NewsQuestion[]? NewsQuestions { get; set; }

}