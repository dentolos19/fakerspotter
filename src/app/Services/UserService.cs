using System.Runtime.CompilerServices;
using Blazored.LocalStorage;

namespace FakerSpotter.Services;

public class UserService
{

    private readonly ISyncLocalStorageService _storage;

    public UserService(ISyncLocalStorageService storage)
    {
        _storage = storage;
    }

    public bool IsRoomOneCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public bool IsRoomTwoCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public bool IsRoomThreeCompleted
    {
        get => GetValue<bool>();
        set => SetValue(value);
    }

    public int PointsAccumulated
    {
        get => GetValue<int>();
        set => SetValue(value);
    }

    private TObject GetValue<TObject>(TObject defaultValue = default!, [CallerMemberName] string? name = null)
    {
        return _storage.ContainKey(name) ? _storage.GetItem<TObject>(name) : defaultValue;
    }

    private void SetValue<T>(T value, [CallerMemberName] string? name = null)
    {
        _storage.SetItem(name, value);
    }

}