using System.Text.Json.Serialization;

namespace FakerSpotter.Models;

public class LeaderboardItem
{

    [JsonPropertyName("name")] public string Name { get; init; }
    [JsonPropertyName("score")] public int Score { get; init; }

}