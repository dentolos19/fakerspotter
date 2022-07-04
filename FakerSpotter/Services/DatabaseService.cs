using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using FakerSpotter.Models;

namespace FakerSpotter.Services;

public class DatabaseService
{

    private readonly HttpClient _client = new() { BaseAddress = new Uri("https://data.mongodb-api.com/app/data-pjfjk/endpoint/") };

    public Task<LeaderboardItem[]> GetLeaderboardAsync()
    {
        return _client.GetFromJsonAsync<LeaderboardItem[]>("general/leaderboard");
    }

    public Task PostLeaderboardAsync(string name, int score)
    {
        return _client.PostAsync("general/leaderboard", new StringContent(JsonSerializer.Serialize(new LeaderboardItem
        {
            Name = name,
            Score = score
        }), Encoding.UTF8, "application/json"));
    }

    public async Task<string[]> GetTipsAsync()
    {
        var json = await _client.GetFromJsonAsync<JsonObject[]>("general/tips");
        return json.Select(x => x["tip"].ToString()).ToArray();
    }

    public Task<StatementQuestion[]> GetStatementQuestionsAsync()
    {
        return _client.GetFromJsonAsync<StatementQuestion[]>("questions/statements");
    }

    public Task<ClosedHeadlineQuestion[]> GetClosedHeadlineQuestionAsync()
    {
        return _client.GetFromJsonAsync<ClosedHeadlineQuestion[]>("questions/headlines/closed");
    }

    public Task<MultipleHeadlineQuestion[]> GetMultipleHeadlineQuestionsAsync()
    {
        return _client.GetFromJsonAsync<MultipleHeadlineQuestion[]>("questions/headlines/multiple");
    }

    public Task<NewsQuestion[]> GetNewsQuestionsAsync()
    {
        return _client.GetFromJsonAsync<NewsQuestion[]>("questions/news");
    }

}