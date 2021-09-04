using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FakerSpotter.Core.Data
{

    public class HeadlineQuestions
    {

        [JsonPropertyName("closed")] public HeadlineClosedQuestion[] ClosedQuestions { get; init; }
        [JsonPropertyName("multipleChoice")] public IDictionary<string, bool>[] MultipleChoiceQuestions { get; init; }

    }

}