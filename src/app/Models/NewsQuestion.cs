using System.Text.Json.Serialization;

namespace FakerSpotter.Models;

public class NewsQuestion
{

    [JsonPropertyName("imageUrl")] public string ImageUrl { get; init; }

    [JsonPropertyName("headline")] public string Headline { get; init; }
    [JsonPropertyName("background")] public string Background { get; init; }
    [JsonPropertyName("isFake")] public bool IsFake { get; init; }

}