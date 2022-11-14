using System.Text.Json.Serialization;

namespace FakerSpotter.Models;

public class StatementQuestion
{

    [JsonPropertyName("statement")] public string Statement { get; init; }
    [JsonPropertyName("isOpinion")] public bool IsOpinion { get; init; }

}