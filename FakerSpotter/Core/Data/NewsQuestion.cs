using System.Text.Json.Serialization;

namespace FakerSpotter.Core.Data;

public class NewsQuestion
{

    private string _imageUrl;

    [JsonPropertyName("imageName")]
    public string ImageUrl
    {
        get => _imageUrl;
        set => _imageUrl = "assets/images/news/" + value;
    }

    [JsonPropertyName("headline")] public string Headline { get; init; }
    [JsonPropertyName("background")] public string Background { get; init; }
    [JsonPropertyName("isFake")] public bool IsFake { get; init; }

}