using System.Text.Json.Serialization;

namespace FakerSpotter.Core.Data
{

    public class StatementQuestion
    {

        [JsonPropertyName("statement")] public string Statement { get; init; }
        [JsonPropertyName("isFact")] public bool IsFact { get; init; }

    }

}