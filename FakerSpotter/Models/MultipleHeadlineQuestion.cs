using System.Text.Json.Serialization;

namespace FakerSpotter.Models;

public class MultipleHeadlineQuestion
{

    [JsonPropertyName("headlines")] public IDictionary<string, bool> Headlines { get; init; }

}