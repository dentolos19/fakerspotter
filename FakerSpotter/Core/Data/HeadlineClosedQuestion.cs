using System.Text.Json.Serialization;

namespace FakerSpotter.Core.Data
{

    public class HeadlineClosedQuestion
    {

        [JsonPropertyName("headline")] public string Headline { get; init; }
        [JsonPropertyName("background")] public string Background { get; init; }
        [JsonPropertyName("isFake")] public bool IsFake { get; init; }

    }

}